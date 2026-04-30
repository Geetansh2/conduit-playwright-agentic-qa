import {
  step,
  attachment,
  severity,
  Severity,
  feature,
  story,
  label,
  LabelName,
} from "allure-js-commons";

class AllureReport {

  async step<T>(name: string, fn: () => Promise<T> | T): Promise<T> {
    return step(name, async () => {
      return await fn();
    });
  }

  addAttachment(name: string, content: string, type: string = "text/plain") {
    attachment(name, content, type);
  }

  setSeverity(level: keyof typeof Severity) {
    severity(Severity[level]);
  }

  addFeature(name: string) {
    feature(name);
  }

  addStory(name: string) {
    story(name);
  }

  tag(name: string) {
    label(LabelName.TAG, name);
  }

  epic(name: string) {
    label(LabelName.EPIC, name);
  }


  parentSuite(name: string){
    label(LabelName.PARENT_SUITE, name)
  }
  
  subSuite(name: string){
    label(LabelName.SUB_SUITE, name);
  }
  suite(name: string){
    label(LabelName.SUITE, name);
  }
}

export const allureReport = new AllureReport();