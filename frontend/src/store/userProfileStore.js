import { create } from "zustand";
import { getUserPublicProfile, getUserPosts } from "../api/profileService";

const useUserProfileStore = create((set, get) => ({
  profiles: {},      // cache theo id
  posts: {},         // cache posts theo id
  loading: {},
  loadingPosts: {},

  fetchUserProfile: async (id) => {
    const sid = String(id);
    if (get().profiles[sid]) return;
    if (get().loading[sid]) return;

    set((s) => ({ loading: { ...s.loading, [sid]: true } }));
    try {
      const data = await getUserPublicProfile(sid);
      set((s) => ({
        profiles: { ...s.profiles, [sid]: data },
        loading: { ...s.loading, [sid]: false },
      }));
    } catch (err) {
      console.error("Lỗi fetch user profile:", err);
      set((s) => ({ loading: { ...s.loading, [sid]: false } }));
    }
  },

  fetchUserPosts: async (id) => {
    const sid = String(id);
    if (get().posts[sid]) return;
    if (get().loadingPosts[sid]) return;

    set((s) => ({ loadingPosts: { ...s.loadingPosts, [sid]: true } }));
    try {
      const res = await getUserPosts(sid);
      const list = res?.data?.data || res?.data || [];
      set((s) => ({
        posts: { ...s.posts, [sid]: Array.isArray(list) ? list : [] },
        loadingPosts: { ...s.loadingPosts, [sid]: false },
      }));
    } catch (err) {
      console.error("Lỗi fetch user posts:", err);
      set((s) => ({ loadingPosts: { ...s.loadingPosts, [sid]: false } }));
    }
  },
}));

export default useUserProfileStore;