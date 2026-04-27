export const allureMeta = async (allure: any, epic: string, feature: string, story: string, severity: string) => {
  await allure.epic(epic);
  await allure.addFeature(feature);
  await allure.addStory(story);
  await allure.setSeverity(severity);
};