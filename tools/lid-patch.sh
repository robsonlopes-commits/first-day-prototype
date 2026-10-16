#!/bin/zsh
# usage: tools/lid-patch.sh <base.jpg> <outPrefix> <x> <y> <w> <h> <variants> [fullTop] [fadeEnd] [extraInstruction]
# Lid QA fix (firstday-imagegen skill, "Lid QA gate"): crops a 16:9 window around ONE bottle lid, asks Gemini for <variants> corrected lids
# (flat, level, evenly white, no raised rim, no sunken inner face), composites each back with tools/blend-patch.swift and leaves
# <outPrefix>-v1.jpg ... <outPrefix>-vN.jpg plus an enlarged lid crop <outPrefix>-v1-lid.jpg ... for inspection. w:h must be 16:9.
# x y w h are pixels of the base image (the window must contain the whole lid and the top of the logo band).
set -e
cd "$(dirname "$0")/.."
BASE=$1 OUT=$2 X=$3 Y=$4 W=$5 H=$6 N=$7 FT=${8:-$((H*50/100))} FE=${9:-$((H*58/100))} EXTRA=${10:-}
[ -x /tmp/blend ] || swiftc -O tools/blend-patch.swift -o /tmp/blend
WORK=$(mktemp -d)
sips -c $H $W --cropOffset $Y $X "$BASE" --out $WORK/crop.jpg >/dev/null
P="Edit image 1, a close-up crop of the top of a First Day bottle, with a strict minimal edit: keep the bottle silhouette, its width and height, the label, the logo, the colors, the lighting and the background exactly the same, pixel for pixel. Change ONLY the lid top face and its edge. Images 2, 3 and 4 are crops of bottles whose lids are CORRECT: copy that lid top exactly. The lid is a thin flat cap: its flat face runs all the way to the outer edge and meets the side wall at one single crisp hairline-thin rounded edge. Remove any thick raised rim, border, lip and step that image 1 shows around the face, and make sure the face is not sunken: it is level with its edge. The face is evenly lit bright white with no darker, greyer or bluer inner area and no shadow. Keep the small blue bird in the center and the thin ring of tiny blue text close to the outer edge, printed flat and squashed by the perspective. Do not change anything else. $EXTRA"
for i in $(seq 1 $N); do
  ( npm run image -- --prompt "$P" --out ${OUT##*/}-patch$i --ref $WORK/crop.jpg --ref reference/bottle-photos/correct-lid-teens-school.jpg --ref reference/bottle-photos/correct-lid-kids-bedtime.jpg --ref reference/bottle-photos/correct-lid-zoom.jpg --aspect 16:9 --size 2K >/dev/null 2>&1
    /tmp/blend "$BASE" public/assets/custom/${OUT##*/}-patch$i.jpg ${OUT}-v$i.jpg $X $Y $W $H $FT $FE 8
    sips -c $H $W --cropOffset $Y $X ${OUT}-v$i.jpg --out $WORK/l$i.jpg >/dev/null
    sips -z $((H*2)) $((W*2)) $WORK/l$i.jpg --out ${OUT}-v$i-lid.jpg >/dev/null
    rm -f public/assets/custom/${OUT##*/}-patch$i.jpg ) &
done
wait
echo "variants written: ${OUT}-v1.jpg .. ${OUT}-v$N.jpg (lid crops: ${OUT}-v*-lid.jpg)"
