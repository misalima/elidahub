import * as profileActions from "../app/actions/profiles";

export const profileService = {
  getProfiles: profileActions.getProfiles,
  getProfileById: profileActions.getProfileById,
  createProfile: profileActions.createProfile,
  updateProfile: profileActions.updateProfile,
  deleteProfile: profileActions.deleteProfile,
};
