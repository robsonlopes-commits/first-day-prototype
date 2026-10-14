// Generated from blocks/fd-narrative-point.liquid {% style %} block. id = block id, color = block.settings.custom_icon_color.
export default function css(id, color) {
  return `
  .fd-np-${id} {
    display: flex;
    align-items: flex-start;
    gap: var(--fd-np-item-inner-gap, 16px);
    width: 100%;
    min-width: 0;
    padding-inline: var(--fd-np-item-padding-inline, 16px);
    text-align: left;
  }

  .fd-np-${id} .fd-np__icon {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--fd-np-icon-disc, 80px);
    height: var(--fd-np-icon-disc, 80px);
    border-radius: 2000px;
    background-color: var(--fd-np-icon-disc-bg, color-mix(in srgb, var(--color-product-magnesium) 5%, transparent));
    color: var(--fd-np-icon-color, var(--color-product-magnesium, #776cb1));
    overflow: hidden;
  }

  .fd-np-${id} .fd-np__icon-glyph,
  .fd-np-${id} .fd-np__icon-mask,
  .fd-np-${id} .fd-np__icon-img {
    display: block;
    width: var(--fd-np-icon-glyph-size, 42px);
    height: var(--fd-np-icon-glyph-size, 42px);
    object-fit: contain;
  }

  .fd-np-${id} .fd-np__icon-mask {
    background-color: ${color || '#776cb1'};
    -webkit-mask-image: var(--fd-np-custom-icon-mask);
    mask-image: var(--fd-np-custom-icon-mask);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
    mask-mode: alpha;
  }

  .fd-np-${id}[data-icon='shield'] .fd-np__icon-glyph {
    width: 31px;
    height: 39px;
  }

  .fd-np-${id}[data-icon='science'] .fd-np__icon-glyph {
    width: 38px;
    height: 38px;
  }

  .fd-np-${id} .fd-np__icon-glyph svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .fd-np-${id} .fd-np__copy {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: var(--fd-np-copy-gap, 8px);
    min-width: 0;
    letter-spacing: 0;
  }

  .fd-np-${id} .fd-np__title {
    margin: 0;
    font-family: var(--fd-np-title-font-family, var(--font-body, 'sofia-pro', sans-serif));
    font-size: var(--fd-np-title-font-size-mobile, 20px);
    font-weight: var(--fd-np-title-font-weight, 700);
    font-style: normal;
    line-height: var(--fd-np-title-line-height, 1.4);
    color: var(--fd-np-title-font-color, var(--color-text-on-light-1, #2c3d50));
    letter-spacing: 0;
    text-transform: capitalize;
    overflow-wrap: break-word;
  }

  .fd-np-${id} .fd-np__body {
    margin: 0;
    font-family: var(--fd-np-body-font-family, var(--font-body, 'sofia-pro', sans-serif));
    font-size: var(--fd-np-body-font-size-mobile, 15px);
    font-weight: var(--fd-np-body-font-weight, 300);
    font-style: normal;
    line-height: var(--fd-np-body-line-height, 1.5);
    color: var(--fd-np-body-font-color, var(--color-text-on-light-1, #2c3d50));
    letter-spacing: 0;
    overflow-wrap: break-word;
  }

  .fd-np-${id} .fd-np__body > :first-child {
    margin-top: 0;
  }

  .fd-np-${id} .fd-np__body > :last-child {
    margin-bottom: 0;
  }

  @media (min-width: 992px) {
    .fd-np-${id}--left {
      flex-direction: row-reverse;
      text-align: right;
    }

    .fd-np-${id} .fd-np__title {
      font-size: var(--fd-np-title-font-size-desktop, 20px);
    }

    .fd-np-${id} .fd-np__body {
      font-size: var(--fd-np-body-font-size-desktop, 15px);
    }
  }
`;
}
