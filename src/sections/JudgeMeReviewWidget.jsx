import { useState } from 'react';
import Img from '../components/Img.jsx';
import { extImg } from '../lib/assets.js';
import './judgemeWidget.css';
import './judgemeMedia.css';

// Static mock of the Judge.me "review_widget" app block (minimal header) + "preview_badge" block.
// Markup/classes follow the live Vue widget (app extension judgeme-784); css = judgemeWidget.css (captured stylesheets).
const STAR_PATH = 'M5.79584 1.27976C6.02014 0.793465 6.71129 0.793466 6.9356 1.27976L8.34335 4.33176C8.43476 4.52996 8.62259 4.66642 8.83933 4.69212L12.177 5.08785C12.7088 5.1509 12.9224 5.80822 12.5292 6.17182L10.0616 8.45379C9.90133 8.60198 9.82959 8.82279 9.87213 9.03686L10.5272 12.3334C10.6315 12.8587 10.0724 13.2649 9.60507 13.0034L6.67225 11.3617C6.4818 11.2551 6.24963 11.2551 6.05918 11.3617L3.12636 13.0034C2.65906 13.265 2.09991 12.8587 2.20428 12.3334L2.8593 9.03686C2.90184 8.82279 2.8301 8.60198 2.66985 8.45379L0.202248 6.17182C-0.190933 5.80822 0.022645 5.1509 0.554454 5.08785L3.8921 4.69212C4.10884 4.66642 4.29667 4.52995 4.38808 4.33176L5.79584 1.27976Z';
const VERIFIED_PATH = 'M0.684155 0C0.306307 0 0 0.306307 0 0.684155V11.3159C0 11.6938 0.306307 12.0001 0.684155 12.0001H11.3158C11.6937 12.0001 12 11.6938 12 11.3159V6.8211C12 6.60481 11.7364 6.49889 11.5867 6.65505L9.21682 9.1281C8.20419 10.1848 7.14718 10.7102 6.0458 10.7044C4.95311 10.7072 3.91541 10.2173 2.93268 9.23457C1.88908 8.19097 1.33927 7.05861 1.28325 5.8375C1.23923 4.70995 1.67935 3.62286 2.60362 2.57623C2.7207 2.44364 2.92186 2.44188 3.04683 2.56685L5.12772 4.64774C5.25163 4.77165 5.25291 4.97316 5.14469 5.11144C4.64177 5.75402 4.62274 6.30774 5.0876 6.7726C5.55722 7.24222 6.08135 7.17511 6.66 6.57128L11.9333 1.06847C11.9761 1.02379 12 0.964298 12 0.902415V0.684155C12 0.306307 11.6937 0 11.3158 0H0.684155Z';
const AI_PATHS = [
  'M12.0025 7.50059C12.0038 7.70445 11.9419 7.9037 11.8252 8.07091C11.7086 8.23813 11.543 8.36509 11.3513 8.43434L8.12754 9.62559L6.94004 12.8518C6.86972 13.0429 6.74249 13.2078 6.57552 13.3242C6.40854 13.4407 6.20987 13.5031 6.00629 13.5031C5.80271 13.5031 5.60404 13.4407 5.43707 13.3242C5.27009 13.2078 5.14286 13.0429 5.07254 12.8518L3.87754 9.62559L0.651291 8.43809C0.460247 8.36776 0.29537 8.24053 0.178907 8.07356C0.0624441 7.90659 0 7.70791 0 7.50434C0 7.30076 0.0624441 7.10208 0.178907 6.93511C0.29537 6.76814 0.460247 6.64091 0.651291 6.57059L3.87754 5.37559L5.06504 2.14934C5.13536 1.95829 5.26259 1.79342 5.42957 1.67695C5.59654 1.56049 5.79522 1.49805 5.99879 1.49805C6.20237 1.49805 6.40104 1.56049 6.56802 1.67695C6.73499 1.79342 6.86222 1.95829 6.93254 2.14934L8.12754 5.37559L11.3538 6.56309C11.5457 6.63296 11.7111 6.76067 11.8274 6.9286C11.9436 7.09653 12.0048 7.29639 12.0025 7.50059Z',
  'M11 1.5C11.0003 1.55094 10.9848 1.60074 10.9557 1.64252C10.9265 1.68431 10.8851 1.71604 10.8372 1.73334L10.0314 2.03103L9.73463 2.83725C9.71706 2.88499 9.68526 2.92619 9.64352 2.95529C9.60179 2.9844 9.55213 3 9.50125 3C9.45036 3 9.40071 2.9844 9.35897 2.95529C9.31724 2.92619 9.28544 2.88499 9.26786 2.83725L8.96918 2.03103L8.16279 1.73428C8.11504 1.7167 8.07383 1.68491 8.04472 1.64318C8.01561 1.60146 8 1.55181 8 1.50094C8 1.45006 8.01561 1.40042 8.04472 1.35869C8.07383 1.31697 8.11504 1.28517 8.16279 1.2676L8.96918 0.968975L9.26599 0.162754C9.28356 0.115013 9.31536 0.0738112 9.3571 0.0447078C9.39883 0.0156044 9.44849 0 9.49937 0C9.55026 0 9.59991 0.0156044 9.64165 0.0447078C9.68338 0.0738112 9.71518 0.115013 9.73276 0.162754L10.0314 0.968975L10.8378 1.26572C10.8858 1.28318 10.9272 1.3151 10.9562 1.35706C10.9852 1.39903 11.0005 1.44897 11 1.5Z',
  'M14 4C14.0004 4.06793 13.9798 4.13431 13.9409 4.19003C13.902 4.24574 13.8468 4.28805 13.7829 4.31112L12.7086 4.70803L12.3128 5.78299C12.2894 5.84665 12.247 5.90159 12.1914 5.94039C12.1357 5.97919 12.0695 6 12.0017 6C11.9338 6 11.8676 5.97919 11.812 5.94039C11.7563 5.90159 11.7139 5.84665 11.6905 5.78299L11.2922 4.70803L10.217 4.31237C10.1534 4.28894 10.0984 4.24654 10.0596 4.19091C10.0208 4.13528 10 4.06908 10 4.00125C10 3.93342 10.0208 3.86722 10.0596 3.81159C10.0984 3.75595 10.1534 3.71356 10.217 3.69013L11.2922 3.29197L11.688 2.21701C11.7114 2.15335 11.7538 2.09841 11.8095 2.05961C11.8651 2.02081 11.9313 2 11.9992 2C12.067 2 12.1332 2.02081 12.1889 2.05961C12.2445 2.09841 12.2869 2.15335 12.3103 2.21701L12.7086 3.29197L13.7838 3.68763C13.8477 3.71091 13.9029 3.75347 13.9416 3.80942C13.9803 3.86537 14.0007 3.93196 14 4Z',
];
const FILTER_PATH = 'M4.66971 3.99935H11.3364L7.99638 8.19935L4.66971 3.99935ZM2.83638 3.73935C4.18305 5.46602 6.66971 8.66602 6.66971 8.66602V12.666C6.66971 13.0327 6.96971 13.3327 7.33638 13.3327H8.66971C9.03638 13.3327 9.33638 13.0327 9.33638 12.666V8.66602C9.33638 8.66602 11.8164 5.46602 13.163 3.73935C13.503 3.29935 13.1897 2.66602 12.6364 2.66602H3.36305C2.80972 2.66602 2.49638 3.29935 2.83638 3.73935Z';
const SORT_PATH = 'M10.6666 11.34V6.66667H9.33325V11.34H7.33325L9.99992 14L12.6666 11.34H10.6666ZM5.99992 2L3.33325 4.66H5.33325V9.33333H6.66659V4.66H8.66659L5.99992 2Z';
const CHEVRON_PATH = 'M11.06 5.53027L8 8.58361L4.94 5.53027L4 6.47027L8 10.4703L12 6.47027L11.06 5.53027Z';
const ROW_CHEVRON = 'M6.47003 4L5.53003 4.94L8.58336 8L5.53003 11.06L6.47003 12L10.47 8L6.47003 4Z';

const Stack = ({ space, className = '', children, ...r }) => <div className={`jm-stack jm-stack--space-${space} ${className}`.trim()} style={{ '--52156a25': `var(--jm-space-${space})` }} {...r}>{children}</div>;
const Cluster = ({ justify = 'flex-start', align = 'center', space = 200, className = '', children, ...r }) => (
  <div className={`jm-cluster ${className}`.trim()} style={{ '--cluster-justify': justify, '--cluster-align': align, '--cluster-space': `var(--jm-space-${space})`, '--cluster-wrap': 'wrap' }} {...r}>{children}</div>);
const Text = ({ size = 'body-md', weight = 'default', as: Tag = 'p', className = '', style, children, ...r }) => (
  <Tag className={`jm-text ${className}`.trim()} style={{ '--text-size': `var(--jm-${size}-size)`, '--text-weight': `var(--jm-${size}-weight-${weight})`, ...style }} {...r}>{children}</Tag>);

// theme variables the live widget sets on its .jm-review-widget container (button / form colours, corner radii)
const WIDGET_ROOT_VARS = { '--jm-review-widget-star-and-histogram-color': '#486CED', '--jm-review-widget-button-color': '#486CED', '--jm-review-widget-button-text-color': '#FFFFFF', '--jm-review-widget-text-color': '#000000', '--jm-review-widget-lighter-text-color': '#7B7B7B', '--jm-widget-primary-color': '#486CED', '--jm-widget-border-radius': 'var(--jm-corner-soft)', '--jm-widget-border-radius-simplified': 'var(--jm-corner-extra-round)', '--jm-review-widget-bar-chart-height': '2px', '--jm-review-widget-form-border-radius': 'var(--jm-corner-square)', '--jm-review-widget-form-background-color': '#fff', '--jm-review-widget-form-button-color': '#486CED', '--jm-review-widget-form-button-text-color': '#fff', '--jm-review-widget-form-field-background-color': '#fafafa', '--jm-review-widget-form-modal-overlay-color': '#000000', '--jm-review-widget-form-text-color': '#333333' };
const WIDGET_VARS = { '--jm-review-widget-star-and-histogram-color': '#486CED', '--jm-review-widget-button-color': '#486CED', '--jm-review-widget-text-color': '#000000', '--jm-review-widget-lighter-text-color': '#7B7B7B', '--jm-widget-primary-color': '#486CED', '--jm-widget-border-radius': 'var(--jm-corner-soft)', '--jm-widget-border-radius-simplified': 'var(--jm-corner-extra-round)' };

const Stars = ({ rating }) => (
  <div className="jm-star-rating" role="img" aria-label={`${rating} out of 5 stars`} style={{ '--082a1a4d': 'var(--jm-review-widget-star-and-histogram-color)' }}>
    <Cluster space={100}>
      <div style={{ display: 'contents' }}>
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="jm-star-rating__filled" aria-hidden="true" style={{ '--jm-icon-size': '1.5em' }}>
            <svg viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={STAR_PATH} /></svg>
          </span>))}
      </div>
    </Cluster>
  </div>
);

function Review({ r }) {
  return (
    <div className="jm-box jm-box--inherit-color jm-review-item" style={{ '--jm-box-padding': 'var(--jm-space-0)', '--jm-box-border-width': 0, ...WIDGET_VARS }}>
      <Stack space={400}>
        <Cluster justify="space-between" align="flex-start" space={1000} className="jm-review-item__body">
          <Stack space={400} className="jm-review-item__content">
            <Cluster justify="space-between" align="flex-start" space={400}><Stars rating={r.rating} /></Cluster>
            <Cluster className="jm-reviewer-info">
              <Stack space={100} className="jm-reviewer-info__details">
                <Cluster space={150}>
                  <Text as="span" className="jm-reviewer-info__name" weight="bold" title={r.name}>{r.name}</Text>
                  <div className="jm-verified-buyer-badge"><Text className="jm-verified-buyer-badge__text" size="body-xs" weight="medium">Verified</Text></div>
                </Cluster>
                <Cluster space={100}><Text as="span" size="body-sm" style={{ color: 'var(--jm-review-widget-lighter-text-color)' }}>{r.date}</Text></Cluster>
              </Stack>
            </Cluster>
            <Stack space={200} className="jm-review-content">
              {r.title && <div className="jm-review-content__title-wrapper">
                <Text className="jm-review-content__title" size="heading-sm" weight="bold" style={{ maxHeight: 'none', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{r.title}</Text>
              </div>}
              <div className="jm-review-body-wrapper" data-jdgm-truncated="false">
                <Text as="div" className="jm-review-content__body" style={{ maxHeight: 'none', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 5 }}>
                  <div className="jdgm-review-content__body-content"><p>{r.body}</p></div>
                </Text>
              </div>
            </Stack>
          </Stack>
        </Cluster>
        {r.pictures?.length > 0 && (
          <Cluster justify="flex-start" align="flex-start" space={200}>
            {r.pictures.map((u) => (
              <div key={u} className="jm-box jm-box--inherit-color" style={{ '--jm-box-padding': 'var(--jm-space-0)', '--jm-box-border-width': 0 }}>
                <div className="jm-frame jm-media-thumbnail-list__thumbnail jm-media-thumbnail-list__thumbnail--default" style={{ aspectRatio: '1/1' }} role="button" aria-label="View review image" tabIndex={0}>
                  <Img src={u.startsWith('http') ? extImg(u) : u} alt="Review Image" loading="lazy" />
                </div>
              </div>
            ))}
          </Cluster>
        )}
        <Cluster justify="space-between" align="flex-start" space={400} />
      </Stack>
    </div>
  );
}

// reviews: JUDGEME.reviews. The "Show more" button reveals nothing new in the prototype (all mock reviews are shown).
export default function JudgeMeReviewWidget({ data, productTitle }) {
  const [sort, setSort] = useState('highest_rating');
  return (
    <div className="shopify-block shopify-app-block">
      <div style={{ clear: 'both' }} />
      <div id="judgeme_product_reviews" className="jdgm-widget jdgm-review-widget jdgm-widget-revamp jdgm--done-setup-widget jdgm-review-widget--medium jm-scope" data-product-title={productTitle} style={{ maxWidth: 1200, margin: '0 auto', ...WIDGET_ROOT_VARS }}>
        <Stack space={300} className="jm-review-widget jm-review-widget--minimal-header">
          <div className="jm-review-widget__header-and-body">
            <Stack space={600} className="jm-review-widget__header jm-review-widget-minimal-header">
              <Cluster justify="space-between" align="flex-end" space={1000}>
                <Stack space={200}>
                  <Text className="jm-review-widget-minimal-header__title" size="heading-md" weight="default" role="heading" aria-level="2">Customer Reviews</Text>
                  <Cluster space={600}>
                    <a className="jm-average-rating-display jm-average-rating-display--clickable jm-average-rating-display--minimal-header" href="#reviews" aria-label="View reviews on the Reviews Site">
                      <Cluster space={200}>
                        <Text size="heading-sm" weight="bold">{data.average.toFixed(1)}</Text>
                        <Text size="body-xs">{data.count} reviews</Text>
                        <div className="jm-verified-badge">
                          <span className="jm-with-icon" role="img" aria-label="Verified checkmark" style={{ '--jm-icon-space': '0.25em', '--jm-icon-justify': 'flex-start', '--jm-icon-align': 'center' }}>
                            <span className="jm-verified-badge__icon"><svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d={VERIFIED_PATH} fill="currentColor" /></svg></span>
                            <Text size="body-xs" style={{ color: 'rgb(0, 0, 0)' }}>Verified</Text>
                          </span>
                        </div>
                      </Cluster>
                    </a>
                  </Cluster>
                </Stack>
                <Stack space={400} className="jm-review-widget-minimal-header__filter-container">
                  <Cluster justify="flex-end" space={200} className="jm-review-widget-minimal-header__button-and-filters">
                    <Cluster justify="flex-end" align="flex-start" space={400} className="jm-action-buttons jm-review-widget-minimal-header__action-buttons">
                      <Stack space={200}>
                        <button type="button" className="jm-button jm-button--primary jm-action-buttons__button" data-testid="write-review-button" style={{ '--jm-btn-padding-inline': 'var(--action-button-padding-inline)', '--jm-btn-padding-block': 'var(--action-button-padding-block)' }}>Write a review</button>
                      </Stack>
                    </Cluster>
                    <Stack space={400} className="jm-review-widget-minimal-header__filters">
                      <Cluster justify="flex-end" align="stretch" space={200} className="jm-filters jm-filters--compact">
                        <Cluster justify="flex-start" align="stretch" space={200} className="jm-filters__buttons">
                          <button type="button" className="jm-button jm-button--secondary jm-custom-answer-filter jm-custom-answer-filter--compact" aria-label="Filters" aria-expanded="false" style={{ '--jm-btn-padding-inline': 'var(--jm-filter-padding-inline)', '--jm-btn-padding-block': 'var(--jm-filter-padding-block)' }}>
                            <span className="jm-with-icon jm-custom-answer-filter__icon" style={{ '--jm-icon-space': 'var(--jm-space-200)', '--jm-icon-justify': 'center', '--jm-icon-align': 'center', '--jm-icon-size': '1em' }}>
                              <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={FILTER_PATH} /></svg>
                              <Text as="span" className="jm-custom-answer-filter__text" size="body-xs" weight="medium">Filters</Text>
                            </span>
                          </button>
                          <div className="jm-sort-filter jm-sort-filter--compact">
                            <label className="jdgm-visually-hidden" htmlFor="jdgm-sort">Sort by</label>
                            <span className="jm-sort-filter__icon jm-sort-filter__icon--sort" style={{ '--jm-icon-size': '1em' }}><svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={SORT_PATH} /></svg></span>
                            <select id="jdgm-sort" className="jdgm-sort-dropdown jm-sort-filter__select" value={sort} onChange={(e) => setSort(e.target.value)}>
                              {[['most_relevant', 'Most Relevant'], ['created_at', 'Most Recent'], ['highest_rating', 'Highest Rating'], ['lowest_rating', 'Lowest Rating'], ['with_pictures', 'Only Pictures'], ['pictures_first', 'Pictures First'], ['videos_first', 'Videos First'], ['most_helpful', 'Most Helpful']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                            </select>
                            <span className="jm-sort-filter__icon jm-sort-filter__icon--chevron" style={{ '--jm-icon-size': '1em' }}><svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={CHEVRON_PATH} /></svg></span>
                          </div>
                        </Cluster>
                      </Cluster>
                    </Stack>
                  </Cluster>
                </Stack>
              </Cluster>
              <div className="jm-ai-insights">
                <div className="jm-box jm-box--inherit-color" style={{ '--jm-box-padding': 'var(--jm-space-0)', '--jm-box-border-width': 0 }}>
                  <Stack space={400}>
                    <Stack space={200}>
                      <div className="jm-ai-insights__header">
                        <div className="jm-ai-disclaimer">
                          <span className="jm-ai-disclaimer__icon" role="img" aria-label="AI-powered" style={{ '--jm-icon-size': '14px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">{AI_PATHS.map((d) => <path key={d.slice(0, 12)} d={d} fill="currentColor" />)}</svg>
                          </span>
                          <Text as="span" size="body-xxs" style={{ color: 'var(--jm-review-widget-lighter-text-color)' }}>Summarized and selected by AI from recent customer reviews</Text>
                        </div>
                        <Text size="body-md" weight="bold" style={{ color: 'var(--jm-review-widget-text-color)' }}>Customers say</Text>
                      </div>
                      <Text size="body-sm" style={{ color: 'var(--jm-review-widget-text-color)' }}>{data.summary}</Text>
                    </Stack>
                    <Stack space={200} className="jm-review-highlights">
                      <Text size="body-sm" weight="bold" style={{ color: 'var(--jm-review-widget-text-color)' }}>Review highlights</Text>
                      <div className="jm-review-highlights__list">
                        {data.highlights.map((h) => (
                          <button key={h} className="jm-review-highlights__row" type="button">
                            <span className="jm-review-highlights__text">{h}</span><span className="jdgm-visually-hidden">More</span>
                            <span className="jm-review-highlights__chevron"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="jm-review-highlights__icon"><path d={ROW_CHEVRON} fill="currentColor" /></svg></span>
                          </button>))}
                      </div>
                    </Stack>
                  </Stack>
                </div>
              </div>
              <Cluster justify="flex-start" align="flex-start" space={100} className="jm-keyword-list" />
            </Stack>
            <div className="jm-loading-overlay jm-review-widget__body">
              <Stack space={600} className="jdgm-review-list">{data.reviews.map((r, i) => <Review key={i} r={r} />)}</Stack>
            </div>
          </div>
          <nav aria-label="Load More Pagination" className="jm-load-more-pagination jm-pagination-controls">
            <div className="jm-center jm-center--center-text" style={{ '--jm-center-max': 'var(--jm-measure)' }}>
              <button type="button" className="jm-button jm-button--primary" aria-label="Show more reviews"><Text as="span" size="body-md">Show more</Text></button>
            </div>
          </nav>
        </Stack>
      </div>
    </div>
  );
}

// "preview_badge" block: stars + "N reviews" under the PDP title.
export function JudgeMePreviewBadge({ rating, count, href = '#reviews' }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  const stars = Array.from({ length: 5 }, (_, i) => (i < full ? 'jdgm--on' : i === full && half ? 'jdgm--half' : (i === full && rating - full >= 0.75 ? 'jdgm--on' : 'jdgm--off')));
  return (
    <div className="shopify-block shopify-app-block">
      <div className="jdgm-widget jdgm-preview-badge jdgm-preview-badge--with-link jdgm--done-setup" data-widget-name="preview_badge">
        <div className="jdgm-prev-badge" data-average-rating={rating} data-number-of-reviews={count} data-number-of-questions="0">
          <span className="jdgm-prev-badge__stars" data-score={rating} aria-label="See all reviews" role="button" onClick={() => { location.hash = href; }}>
            {stars.map((c, i) => <span key={i} className={`jdgm-star ${c}`} />)}
          </span>
          <span className="jdgm-prev-badge__text">{count} reviews</span>
        </div>
      </div>
    </div>
  );
}
