import { KeyHideChannelProfile } from "../../../data/storage-key";
import { addStyle } from "../utils/addStyle";
import { removeElementById } from "../utils/removeElement";

export const optionHideChannelProfile = (hideChannelProfile) => {
  if (!hideChannelProfile) {
    removeElementById(KeyHideChannelProfile);
    return;
  }
  addStyle(
    KeyHideChannelProfile,
    `
    .channel-avatar.ytd-ghost-grid-renderer,
    #home-page-skeleton .channel-avatar {
        display: none !important;
    }
    #avatar-container.ytd-rich-grid-media,
    ytd-rich-grid-media a#avatar-link {
        display: none !important;
    }
    `
  );
};
