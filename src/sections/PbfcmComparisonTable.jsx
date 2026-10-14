import Img from '../components/Img.jsx';
import useFadePanels from '../components/useFadePanels.js';
import { settingImg } from '../lib/settingsImg.js';
import { resolveTokens } from '../lib/resolveTokens.js';
import { COMPARISON_HOME } from '../data/sharedSections.js';
import stylesCss from './pbfcmStylesCss.js';
import comparisonCss from './pbfcmComparisonTableCss.js';
import '../styles/fd-ui-kit.css';
import '../styles/theme/fd-tabs-v3.css';

// sections/pbfcm-comparison-table.liquid (+ snippets/pbfcm-styles.css, wave-bg-svg, pbfcm-benefit-head-logo, pbfcm-comparison-table-extended.js).
// Props = { id, settings, blocks } as in the template JSON (see src/data/sharedSections.js: COMPARISON_HOME / COMPARISON_SALE / COMPARISON_LP).
const CHECK = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM16.3652 7.95378C16.1224 7.95214 15.8885 8.04511 15.7126 8.21256C15.7037 8.22126 15.696 8.23061 15.6882 8.24023L11.3473 13.7708L8.73014 11.1553C8.64432 11.0632 8.54078 10.9884 8.42578 10.9372C8.31099 10.886 8.18684 10.8597 8.0612 10.8574C7.93552 10.8552 7.80994 10.8772 7.69336 10.9242C7.57662 10.9713 7.46988 11.0418 7.38086 11.1309C7.29184 11.2199 7.2213 11.3266 7.17415 11.4434C7.12715 11.5599 7.1052 11.6855 7.10742 11.8112C7.10971 11.9368 7.13605 12.061 7.18717 12.1758C7.23841 12.2908 7.31316 12.3943 7.40527 12.4801L10.7126 15.7874C10.8017 15.8766 10.9082 15.947 11.0251 15.9941C11.1419 16.0412 11.267 16.0648 11.3929 16.0625C11.5186 16.0602 11.6427 16.0323 11.7575 15.9811C11.8723 15.9298 11.9762 15.8551 12.0618 15.763L17.0505 9.52441C17.2144 9.3453 17.3026 9.1096 17.2962 8.86686C17.2898 8.62399 17.1896 8.39258 17.0163 8.22233C16.8427 8.05205 16.6083 7.95562 16.3652 7.95378Z" fill="white" /></svg>;
const CROSS = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17.9914 6.17307C18.2221 5.94231 18.5962 5.94231 18.8269 6.17307C19.0577 6.40384 19.0577 6.77791 18.8269 7.00866L13.3356 12.5L18.8269 17.9914C19.0577 18.2221 19.0577 18.5962 18.8269 18.8269C18.5962 19.0577 18.2221 19.0577 17.9914 18.8269L12.5 13.3356L7.00866 18.8269C6.77791 19.0577 6.40384 19.0577 6.17307 18.8269C5.94231 18.5962 5.94231 18.2221 6.17307 17.9914L11.6644 12.5L6.17307 7.00866C5.94231 6.7779 5.94231 6.40384 6.17307 6.17307C6.40384 5.94231 6.7779 5.94231 7.00866 6.17307L12.5 11.6644L17.9914 6.17307Z" fill="#D24343" /></svg>;
const WAVE = (fill) => (
  <svg className="wave-bg-svg" width="1512" height="99" viewBox="0 0 1512 99" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M402.114 16.1803C323.643 26.0636 261.786 29.7581 209.353 29.7581C134.549 29.7581 78.8789 22.2483 21.338 14.4771C18.2594 14.0628 15.1623 13.6394 12.0488 13.2138C8.05809 12.6683 4.0404 12.1191 0 11.5805V55.0391V67.8903V98.4246H1512V55.0391V11.9248C1413.65 -0.586985 1351.75 -8.28011 1157.53 16.1803C1079.05 26.0636 1017.2 29.7581 964.765 29.7581C889.962 29.7581 834.291 22.2483 776.753 14.4771C773.675 14.0628 770.574 13.6395 767.463 13.214C763.473 12.6684 759.455 12.1191 755.416 11.5805V11.5872C657.065 -0.924574 596.339 -8.28011 402.114 16.1803Z" fill={fill || 'currentColor'} />
  </svg>
);
// Newlines in plain-text settings (e.g. "Basic\nMultis") collapse to a space in the theme's HTML as well.
const lines = (t) => t || '';

function BenefitHeadLogo() {
  return (
    <svg className="pbfcm-benefit-head-logo" width="76" height="22" viewBox="0 0 76 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M36.4331 15.9339C35.4935 15.9339 35.0601 15.4283 35.0601 14.4922V8.26565H37.2966V6.86964H35.0601V4.64844H34.0245L32.7309 6.60871L30.7656 7.28714V8.12539H32.2743V14.6977C32.2743 16.5536 33.4588 17.5386 35.1296 17.5386C37.4555 17.5386 38.4348 15.8295 38.4348 15.8295L37.9749 15.1641C37.9749 15.1641 37.3727 15.9339 36.4331 15.9339Z" fill="white" />
      <path d="M8.18528 3.38889C9.11497 3.38889 9.85939 2.67785 9.85939 1.76458C9.85939 1.34708 9.69396 0.978509 9.42597 0.701266C9.41605 0.691481 9.40943 0.681696 9.3995 0.671911C9.34326 0.616462 9.27709 0.564275 9.21092 0.51535C8.76427 0.179397 8.08933 3.86473e-06 7.22581 3.86473e-06C4.3871 -0.00325782 1.80976 2.05813 1.80976 5.83516V6.6147L0.0198511 7.43991V8.12812H1.80976V14.9287C1.80976 15.7311 1.2043 16.2106 0.416873 16.3476L0 16.4161V17.1728H6.80562V16.4161L5.91894 16.328C5.19768 16.2595 4.57568 15.6887 4.57568 14.8211V8.26511H6.80562V6.86911H4.57568V5.1502C4.57568 2.77244 5.06203 1.17095 6.61042 1.16769C6.53433 1.35034 6.49131 1.55257 6.49131 1.76458C6.49131 2.68111 7.21257 3.38889 8.18528 3.38889Z" fill="white" />
      <path d="M71.7501 6.86523V7.62195L72.2365 7.7361C72.6302 7.82743 72.9114 7.98725 72.9114 8.31016C72.9114 8.56131 72.7956 8.86139 72.6335 9.27236L70.6351 14.1257L68.8221 8.83529C68.7758 8.67547 68.7063 8.53848 68.7063 8.37866C68.7063 7.99052 69.0305 7.85352 69.497 7.7361L69.9635 7.62195V6.86523H64.296V7.62195L64.7857 7.7361C65.3184 7.85026 65.6227 8.14708 65.9701 9.01795L69.1992 17.1917L68.6434 18.4736C68.2497 19.3607 67.8527 19.9739 67.2935 20.1892C67.1976 19.3901 66.5028 18.7965 65.6393 18.7965C64.6633 18.7965 63.9453 19.4847 63.9453 20.3751C63.9453 21.2656 64.6666 21.9994 65.6393 21.9994C67.985 21.9994 69.0834 20.535 69.8279 18.7704L73.8444 9.42892C74.2613 8.46672 74.6815 7.91876 75.5152 7.7361L76.0016 7.62195V6.86523H71.7501Z" fill="white" />
      <path d="M24.9417 8.9573C24.9417 8.17776 25.4777 7.60696 26.4967 7.60696C26.7714 7.60696 26.9996 7.65262 27.2114 7.7146C27.0625 7.93639 26.9765 8.20059 26.9765 8.49088C26.9765 9.32261 27.6316 9.96842 28.5149 9.96842C29.3983 9.96842 30.0336 9.32261 30.0336 8.49088C30.0336 7.05574 28.2833 6.52734 26.5861 6.52734C24.1245 6.52734 22.6159 7.78635 22.6159 9.52809C22.6159 13.0768 27.926 12.4375 27.926 15.0697C27.926 15.8492 27.1816 16.4885 25.9508 16.4885C25.4182 16.4885 25.0906 16.3157 25.0079 16.1363C25.3156 15.8329 25.5075 15.4154 25.5075 14.9555C25.5075 14.0357 24.7499 13.2921 23.8202 13.2921C22.8872 13.2921 22.1328 14.039 22.1328 14.9555C22.1328 16.6744 23.8466 17.5681 25.8814 17.5681C28.2271 17.5681 30.3181 16.6059 30.3181 14.3847C30.3181 10.7447 24.9384 11.0872 24.9384 8.9573H24.9417Z" fill="white" />
      <path d="M65.7739 16.3907L65.4728 15.8884C65.4728 15.8884 65.1254 16.0483 64.6358 16.0483C63.8219 16.0483 63.3355 15.4057 63.3355 14.3978C63.3355 13.0932 63.544 11.3058 63.544 10.0011C63.544 7.6429 62.0816 6.49805 59.7359 6.49805C57.6647 6.49805 55.855 7.23845 55.544 8.49094C55.5009 8.62467 55.4712 8.76818 55.4712 8.91822C55.4712 9.74995 56.1263 10.3958 57.0096 10.3958C57.893 10.3958 58.5282 9.74995 58.5282 8.91822C58.5282 8.53008 58.3727 8.19086 58.118 7.93645C58.3198 7.80272 58.5845 7.71139 58.9418 7.71139C60.2421 7.71139 60.7317 8.30828 60.7317 9.88694C60.7317 10.2327 60.7119 10.8622 60.6887 11.433C56.9368 11.4721 54.8359 12.8225 54.8359 15.0567C54.8359 16.3907 55.8086 17.5356 58.0187 17.5356C59.7292 17.5356 60.9832 16.3451 60.9832 16.3451C61.3074 16.9191 62.0287 17.5356 63.2131 17.5356C64.8608 17.5356 65.7673 16.3907 65.7673 16.3907H65.7739ZM59.405 16.1168C58.0617 16.1168 57.582 15.1904 57.582 14.3652C57.582 12.8844 59.0708 12.3626 60.6556 12.3267C60.649 12.5159 60.6424 12.6365 60.6424 12.6365C60.6424 12.6365 60.5498 13.4161 60.5498 14.238C60.5498 14.8349 60.5961 15.2231 60.735 15.634C60.735 15.634 60.2619 16.1135 59.405 16.1135V16.1168Z" fill="white" />
      <path d="M52.9343 15.2485V0.639434C52.9343 0.531799 52.8251 0.453518 52.7225 0.492658L48.4513 1.55271V2.23766H48.6365C49.682 2.23766 50.1452 2.60623 50.1452 3.49993V6.66051C49.5662 6.54635 48.9376 6.50068 48.309 6.50068C44.3619 6.50068 42.0625 9.17853 42.0625 12.3391C42.0625 15.2029 44.0377 17.5382 46.5919 17.5382C49.146 17.5382 50.1452 15.8421 50.1452 15.8421V16.1161L50.3239 17.1697H54.4198V16.4129C54.4198 16.4129 52.9343 16.426 52.9343 15.2485ZM50.1485 14.9028C50.1485 14.9028 49.3578 15.8421 48.1502 15.8421C46.0592 15.8421 45.1295 14.0776 45.1295 11.814C45.1295 9.38727 46.2676 7.57704 47.9847 7.57704C49.2618 7.57704 50.1419 8.23916 50.1452 9.65473V14.9028H50.1485Z" fill="white" />
      <path d="M21.009 6.50133C19.4507 6.50133 18.4416 7.79296 18.2861 8.32787V6.75248C18.2861 6.64484 18.177 6.56656 18.0744 6.6057L13.8031 7.66575V8.3507H13.9884C15.0339 8.3507 15.4971 8.71927 15.4971 9.61298V12.8975V14.923C15.4971 15.0176 15.4871 15.1089 15.4706 15.1937C15.4706 15.2035 15.4673 15.21 15.464 15.2198C15.3746 15.6438 15.0901 15.9537 14.7096 16.1461C14.6699 16.1657 14.6269 16.1853 14.5872 16.2016C14.5773 16.2048 14.5674 16.2081 14.5574 16.2114C14.4648 16.2472 14.3688 16.2766 14.2762 16.3027C14.2597 16.306 14.2431 16.3092 14.2266 16.3157C13.9718 16.3744 13.7369 16.394 13.5748 16.394C13.0454 16.394 11.9205 16.3581 11.9205 15.1024V6.74595C11.9205 6.63832 11.8114 6.56004 11.7088 6.59918L7.4375 7.65923V8.34418H7.62278C8.66827 8.34418 9.13146 8.71275 9.13146 9.60645V14.9197C9.13146 15.7221 8.66827 16.2244 7.90069 16.3386L7.4375 16.4071V17.1638H13.7038H20.4234V16.4071L19.7187 16.332C19.0206 16.2636 18.2828 15.6601 18.2828 14.7893V15.0991V9.57384C18.3887 9.14003 18.8949 8.54967 19.5731 8.47791C19.7915 9.02587 20.3308 9.40097 21.0057 9.40097C21.8494 9.40097 22.5243 8.75515 22.5243 7.92342C22.5243 7.09169 21.8494 6.48828 21.0057 6.48828L21.009 6.50133Z" fill="white" />
    </svg>
  );
}

// image_tag emits width/height (+ focal point object-position) from the Shopify image metadata; the desktop art relies on the width attribute.
const IMG_META = {
  'desk_720.png': { width: 1200, height: 2805, style: { objectPosition: '49.341% 58.887%' } },
  'mob-left_360.png': { width: 300, height: 341, style: { objectPosition: '50.0% 49.414%' } },
  'mob-right.png': { width: 300, height: 306, style: { objectPosition: '50.0% 49.414%' } },
};
const metaFor = (v) => IMG_META[String(v || '').replace('shopify://shop_images/', '')] || {};

export default function PbfcmComparisonTable({ id = COMPARISON_HOME.id, settings = COMPARISON_HOME.settings, blocks = COMPARISON_HOME.blocks }) {
  const s = settings;
  const sid = id;
  const tabs = blocks.filter((b) => b.type === 'settings_tab' && b.settings.benefit_tab);
  const useExtended = !!s.extended_version && blocks.some((b) => b.type === 'settings_tab' || b.type === 'benefit_extended_row');
  const fp = useFadePanels(tabs[0]?.id);
  const css = stylesCss(s, sid) + comparisonCss(s, sid, { blocks });

  return (
    <div id={`shopify-section-${sid}`} className="shopify-section">
      <style>{css}</style>
      {s.extended_version && <div className={`pbfcm-comparison-wave-${sid}`} aria-hidden="true">{WAVE(s.background_color)}</div>}
      <div className={`pbfcm-comparison-section-${sid}${s.extended_version ? ' m-ext' : ''}`} id={s.anchor_id || sid}>
        <div className={`pbfcm-comparison-container-${sid}`}>
          <div className={`pbfcm-comparison-wrapper-${sid}`}>
            {s.desktop_image && <div className={`pbfcm-comparison-desktop-image-${sid}`} aria-hidden="true"><Img src={settingImg(s.desktop_image)} alt="" loading="lazy" {...metaFor(s.desktop_image)} /></div>}
            {s.mobile_image_left && <div className={`pbfcm-comparison-mobile-image-left-${sid}`} aria-hidden="true"><Img src={settingImg(s.mobile_image_left)} alt="" loading="lazy" {...metaFor(s.mobile_image_left)} /></div>}
            {s.mobile_image_right && <div className={`pbfcm-comparison-mobile-image-right-${sid}`} aria-hidden="true"><Img src={settingImg(s.mobile_image_right)} alt="" loading="lazy" {...metaFor(s.mobile_image_right)} /></div>}

            <div className={`pbfcm-comparison-left-${sid}`}>
              {s.logo && <div className={`pbfcm-comparison-logo-${sid}`}><Img src={settingImg(s.logo)} alt="Logo" /></div>}
              {s.title && <h2 className={`pbfcm-comparison-title-${sid}`} dangerouslySetInnerHTML={{ __html: s.title }} />}
              {s.description && <p className={`pbfcm-comparison-description-${sid}`}>{s.description}</p>}
            </div>

            {useExtended ? (
              <pbfcm-comparison-extended class={`pbfcm-comparison-extended-${sid}`}>
                <div className={`pbfcm-comparison-tabs-${sid} fd-tabs-v3 fd-tabs-v3--small`} role="tablist">
                  {tabs.map((t) => (
                    <button key={t.id} type="button" role="tab" className={`fd-tabs-v3__item${t.id === fp.active ? ' fd-tabs-v3__item--active' : ''}`} data-comparison-tab={t.id} aria-selected={t.id === fp.active} onClick={() => fp.activate(t.id)}>{t.settings.benefit_tab}</button>
                  ))}
                </div>
                <div className={`pbfcm-comparison-select-wrapper-${sid}`} data-comparison-select-wrapper>
                  <label className="visually-hidden" htmlFor={`pbfcm-comparison-select-${sid}`}>Choose comparison category</label>
                  <select id={`pbfcm-comparison-select-${sid}`} className={`pbfcm-comparison-select-${sid}`} value={fp.active} onChange={(e) => fp.activate(e.target.value)}>
                    {tabs.map((t) => <option key={t.id} value={t.id}>{t.settings.benefit_tab}</option>)}
                  </select>
                  <span className={`pbfcm-comparison-select-icon-${sid}`} aria-hidden="true">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>

                <div {...fp.viewportProps(`pbfcm-comparison-panels-viewport-${sid}`)} data-comparison-panels-viewport>
                  {tabs.map((t) => {
                    const key = (t.settings.benefit_tab || '').trim();
                    return (
                      <div key={t.id} {...fp.panelProps(t.id, `pbfcm-comparison-panel-${sid}`)} data-comparison-panel={t.id} style={{ '--benefit-column-bg-color': t.settings.benefit_column_bg_color || '#64daa1' }}>
                        <div className={`pbfcm-comparison-table-${sid}`} role="table" aria-label={`${t.settings.benefit_tab} comparison`}>
                          <div className={`pbfcm-comparison-header-row-${sid} pbfcm-comparison-header-row--extended-${sid}`} role="row">
                            <div className={`pbfcm-comparison-header-spacer-${sid}`} role="columnheader" />
                            <div className={`pbfcm-comparison-subscribers-header-${sid}${s.use_logo_for_benefit_head ? ' has-benefit-logo' : ''}`} role="columnheader">
                              {s.use_logo_for_benefit_head ? (<><BenefitHeadLogo /><span className="visually-hidden">{t.settings.benefit_column_name}</span></>) : t.settings.benefit_column_name}
                            </div>
                            <div className={`pbfcm-comparison-onetime-header-${sid}`} role="columnheader">{lines(t.settings.second_column_name)}</div>
                            <div className={`pbfcm-comparison-onetime-header-${sid} is-third`} role="columnheader">{lines(t.settings.third_column_name)}</div>
                          </div>
                          <div className={`pbfcm-comparison-benefits-${sid}`} role="rowgroup">
                            {blocks.filter((r) => r.type === 'benefit_extended_row' && (r.settings.benefit_tab || '').trim() === key).map((r) => {
                              const heading = (r.settings.benefit_column_heading || '').trim();
                              const isCheck = heading !== '' && heading.toLowerCase() === 'check';
                              return (
                                <div key={r.id} className={`pbfcm-comparison-row-${sid} pbfcm-comparison-row--extended-${sid}`} role="row">
                                  <div className={`pbfcm-comparison-benefit-${sid}`} role="rowheader">{lines(r.settings.benefit_text)}</div>
                                  <div className={`pbfcm-comparison-check-${sid}${isCheck ? '' : ' subscribers'}`} role="cell">{isCheck ? CHECK : heading}</div>
                                  <div className={`pbfcm-comparison-close-${sid}`} role="cell" aria-label="Not included">{CROSS}</div>
                                  <div className={`pbfcm-comparison-close-${sid}`} role="cell" aria-label="Not included">{CROSS}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </pbfcm-comparison-extended>
            ) : (
              <div className={`pbfcm-comparison-table-${sid}`} role="table" aria-label="Comparison of subscriber vs one-time purchase benefits">
                <div className={`pbfcm-comparison-header-row-${sid}`} role="row">
                  <div className={`pbfcm-comparison-header-spacer-${sid}`} role="columnheader"> </div>
                  <div className={`pbfcm-comparison-subscribers-header-${sid}`} role="columnheader">{s.subscribers_label}</div>
                  <div className={`pbfcm-comparison-onetime-header-${sid}`} role="columnheader">{s.onetime_label}</div>
                </div>
                <div className={`pbfcm-comparison-benefits-${sid}`} role="rowgroup">
                  {blocks.map((b) => {
                    if (b.type === 'benefit_row') {
                      return (
                        <div key={b.id} className={`pbfcm-comparison-row-${sid}`} role="row">
                          <div className={`pbfcm-comparison-benefit-${sid}`} role="rowheader">{resolveTokens(b.settings.benefit_text)}</div>
                          <div className={`pbfcm-comparison-check-${sid}`} role="cell" aria-label="Included for subscribers">{CHECK}</div>
                          <div className={`pbfcm-comparison-close-${sid}`} role="cell" aria-label="Not included for one-time purchasers">{CROSS}</div>
                        </div>
                      );
                    }
                    if (b.type === 'duration_row') {
                      return (
                        <div key={b.id} className={`pbfcm-comparison-row-${sid}`} role="row">
                          <div className={`pbfcm-comparison-benefit-${sid}`} role="rowheader">{b.settings.benefit_text}</div>
                          <div className={`pbfcm-comparison-check-${sid} subscribers`} role="cell">{b.settings.subscribers_duration}</div>
                          <div className={`pbfcm-comparison-close-${sid} onetime`} role="cell">{b.settings.onetime_duration}</div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
