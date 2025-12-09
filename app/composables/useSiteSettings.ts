export const useSiteSettings = () => {
  const query = groq`*[_type == "siteSettings"][0] {
    headerLinks,
    logo,
    title,
    description
  }`;

  const { data: siteSettings } = useLazySanityQuery(query);

  return { siteSettings };
};
