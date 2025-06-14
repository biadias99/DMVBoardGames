import { BaseTemplateDynamicComponent } from "../../../../framework/components/BaseTemplateDynamicComponent.ts";
import type { OpenCreateGroupPageState } from "../data/types/OpenCreateGroupPageState.ts";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    .openGroupEditPageButton {
      padding: 2rem;
    }
  </style>
  <div></div>
`;

const loadConfig = {
  globalStateLoadConfig: {
    globalFieldSubscriptions: ["isLoggedIn"],
    waitForGlobalState: "isLoggedIn",
    defaultGlobalStateReducer: function (updates: Record<string, string>) {
      return {
        isVisible: updates["isLoggedIn"],
      };
    },
  },
};

export class OpenCreateGroupPageComponent extends BaseTemplateDynamicComponent {
  constructor() {
    super("Open_Create_Group_Page_Component_Store", loadConfig);
  }
  getTemplate(): HTMLTemplateElement {
    return template;
  }

  render(data: OpenCreateGroupPageState): string {
    console.log("Hi");
    return `
      ${data.isVisible ? `<button>Create group </button>` : ""} 
    `;
  }
}

if (!customElements.get("open-create-group-page-component")) {
  customElements.define(
    "open-create-group-page-component",
    OpenCreateGroupPageComponent,
  );
}
