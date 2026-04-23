import { useEffect } from "react";
import useUserProfileStore from "../store/userProfileStore";

export default function useUserProfile(id) {
  const {
    profiles, posts, loading, loadingPosts,
    fetchUserProfile, fetchUserPosts,
  } = useUserProfileStore();

  const sid = String(id);

  useEffect(() => {
    if (!id) return;
    fetchUserProfile(id);
    fetchUserPosts(id);
  }, [id]);

  return {
    profileData: profiles[sid] || null,
    posts: posts[sid] || [],
    loading: loading[sid] || false,
    loadingPosts: loadingPosts[sid] || false,
  };
}