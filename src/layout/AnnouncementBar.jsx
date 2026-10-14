import SiteLink from './SiteLink.jsx';
import { announcement } from '../data/navigation.js';
import './styles/announcement-bar.css';
import './styles/announcement-bar.settings.css';

// sections/announcement-bar-v2.liquid with the header-group.json settings:
// bg #3f5a73, text #fff, badge #ffb511 / #2c3e50 (11px, radius 11), tag icon, dialog -> /pages/sale.
const TAG_PATH =
  'M11.0172 20.8463C10.8204 20.8463 10.6272 20.8085 10.4375 20.7328C10.2477 20.6571 10.0752 20.5395 9.92024 20.3798L3.60774 14.0798C3.4514 13.9228 3.33716 13.7496 3.26499 13.5603C3.19282 13.3708 3.15674 13.1757 3.15674 12.9751C3.15674 12.7809 3.19357 12.5875 3.26724 12.3948C3.34091 12.2023 3.4544 12.0249 3.60774 11.8626L11.8692 3.60781C12.0146 3.46214 12.1825 3.35006 12.373 3.27156C12.5635 3.19306 12.7603 3.15381 12.9635 3.15381H19.2885C19.7275 3.15381 20.0969 3.30639 20.3967 3.61156C20.6964 3.91656 20.8462 4.28323 20.8462 4.71156V11.0213C20.8462 11.2313 20.8084 11.4316 20.7327 11.6221C20.6571 11.8126 20.544 11.9766 20.3935 12.1141L12.1115 20.3798C11.9583 20.5395 11.7868 20.6571 11.597 20.7328C11.4073 20.8085 11.2141 20.8463 11.0172 20.8463ZM17.3885 7.55781C17.6603 7.55781 17.8912 7.46523 18.0812 7.28006C18.2712 7.09489 18.3662 6.87006 18.3662 6.60556C18.3662 6.33572 18.2724 6.10581 18.0847 5.91581C17.8971 5.72581 17.6692 5.63081 17.4012 5.63081C17.1282 5.63081 16.8997 5.72447 16.7155 5.91181C16.5315 6.09914 16.4395 6.32664 16.4395 6.59431C16.4395 6.86198 16.531 7.08947 16.714 7.27681C16.897 7.46414 17.1218 7.55781 17.3885 7.55781Z';

function Text({ className }) {
  return (
    <span className={`sale-announcement-text ${className}`}>
      {announcement.text} <span className="sale-announcement-badge">{announcement.badge}</span>
    </span>
  );
}

export default function AnnouncementBar() {
  return (
    <div id="shopify-section-announcement" className="shopify-section shopify-section-announcement-bar">
      <div className="sale-announcement-bar header-section--padding abtestbar1 header-wrapper-container-announcement-bar">
        <div className="page-width">
          <SiteLink href={announcement.url} className="sale-announcement-trigger" aria-label="Open sales dialog">
            <svg className="sale-announcement-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d={TAG_PATH} fill="white" />
            </svg>
            <Text className="sale-announcement-text--desktop" />
            <Text className="sale-announcement-text--mobile" />
            <svg className="sale-announcement-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.6308 17.2157L12.9846 16.5454L17.0731 12.4569H5.15381V11.5339H17.0731L12.9846 7.44542L13.6308 6.78467L18.8463 12.0002L13.6308 17.2157Z" fill="currentColor" />
            </svg>
          </SiteLink>
        </div>
      </div>
    </div>
  );
}
