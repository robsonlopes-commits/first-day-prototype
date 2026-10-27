#!/bin/bash
# Fixes the garbled label print of bottles in a generated photo, one close-up edit per bottle, blended back (the method that worked on 2026-10-27).
# Env LP_PCT = crop width in percent of the image width (default 26, use about 18 for small bottles).
# Usage: tools/label-patch.sh <base.jpg> <out.jpg> <ref1.png:cx:cy> [<ref2.png:cx:cy> ...]
#   ref = the real front view of THAT bottle (public/assets/shop/*.png, resized to 900 px), cx and cy = the center of the bottle in the base image, in pixels.
# Each bottle: crop 3:4 around it (size from the image width), edit with Gemini (2K, strict minimal edit, label redrawn from the reference), blend back with
# tools/blend-patch.swift (compile once: swiftc -O tools/blend-patch.swift -o /tmp/blend). Look at every lid and label of the result afterwards.
set -e
cd "$(dirname "$0")/.."
BASE="$1"; OUT="$2"; shift 2
W=$(sips -g pixelWidth "$BASE" | awk '/pixel/{print $2}'); H=$(sips -g pixelHeight "$BASE" | awk '/pixel/{print $2}')
PW=$(( W * ${LP_PCT:-26} / 100 )); PH=$(( PW * 4 / 3 )); PW=$(( PH * 3 / 4 ))   # crop 3:4, about a quarter of the width
TMP="$(mktemp -d)"; cp "$BASE" "$TMP/cur.jpg"
PROMPT="Edit image 1, a close-up crop of a First Day bottle in a photo, with a strict minimal edit: keep the silhouette, size, position, perspective, the flat white lid with its top surface, the lighting, colors, background and everything else exactly the same, pixel aligned. Change ONLY the printed text and graphics on the label, which are soft and garbled. Image 2 is the real front view of this exact bottle. Redraw every printed element to match image 2 exactly with natural photographic sharpness, following the curve and perspective of the bottle in image 1: the first day logo, the audience word, the NO JUNK seal with its ring text, the product name in full and correctly spelled, the small ingredient lines, the certification badges and the 60 GUMMIES | DIETARY SUPPLEMENT line. No glow, no halos, no colored outlines, no oversharpening. Do not change anything else."
i=0
for spec in "$@"; do
  i=$((i+1)); REF="${spec%%:*}"; REST="${spec#*:}"; CX="${REST%%:*}"; CY="${REST##*:}"
  X=$(( CX - PW/2 )); Y=$(( CY - PH/2 )); [ $X -lt 0 ] && X=0; [ $Y -lt 0 ] && Y=0
  [ $((X+PW)) -gt $W ] && X=$((W-PW)); [ $((Y+PH)) -gt $H ] && Y=$((H-PH))
  echo "$X $Y" > "$TMP/pos$i"
  sips -c $PH $PW --cropOffset $Y $X "$BASE" --out "$TMP/crop$i.jpg" >/dev/null
  ( node tools/generate-image.mjs --out "labelpatch-$$-$i" --aspect 3:4 --size 2K --ref "$TMP/crop$i.jpg" --ref "$REF" --prompt "$PROMPT" >/dev/null 2>&1; mv "public/assets/custom/labelpatch-$$-$i.jpg" "$TMP/patch$i.jpg" ) &
done
wait
j=0
for spec in "$@"; do
  j=$((j+1)); read X Y < "$TMP/pos$j"
  [ -f "$TMP/patch$j.jpg" ] || { echo "patch $j failed, skipped"; continue; }
  sips -z $PH $PW "$TMP/patch$j.jpg" --out "$TMP/patchs$j.jpg" >/dev/null
  /tmp/blend "$TMP/cur.jpg" "$TMP/patchs$j.jpg" "$TMP/next.jpg" $X $Y $PW $PH $((PH*94/100)) $PH $((PW*6/100))
  mv "$TMP/next.jpg" "$TMP/cur.jpg"
done
cp "$TMP/cur.jpg" "$OUT"; echo "wrote $OUT"
