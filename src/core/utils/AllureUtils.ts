export const allureMeta = async (allure: any, parentSuite: string, epic: string, feature: string, story: string, severity: string) => {
  await allure.parentSuite(parentSuite)
  await allure.epic(epic);
  await allure.addFeature(feature);
  await allure.addStory(story);
  await allure.setSeverity(severity);
};