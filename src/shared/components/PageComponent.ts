import { NavbarComponent } from "../../ui/static/NavbarComponent.ts";
import { LoginComponent } from "../../ui/auth/components/LoginComponent.ts";
import { getComponent } from "./ComponentRegistry.ts";
import { setupStateFields} from "../InitGlobalStateConfig.ts";
import {GroupPageComponent} from "../../ui/groups/viewGroup/components/GroupPageComponent.ts";
import {PageState} from "../../framework/state/PageState.ts";
import {EventDetailsComponent} from "../../ui/groups/event/components/EventDetailsComponent.ts";

export const GROUP_PAGE_ROUTE = "groupPageRoute";
export const GROUP_EVENT_PAGE_ROUTE ="groupEventPageRoute";

export class PageComponent extends HTMLElement {

  static currentComponent: PageComponent;

  constructor() {
    super();

    setupStateFields();
    const componentName: string = this.getAttribute("componentName") ?? "";
    this.appendChild(new NavbarComponent());
    this.appendChild(new LoginComponent());

    PageState.activeComponent = getComponent(componentName);
    this.appendChild(PageState.activeComponent);

    PageComponent.currentComponent = this;

    const self = this;
    window.addEventListener("popstate", () => {
      self.removeChild(PageState.activeComponent);

      const prevState = PageState.popPrevComponent();
      if(prevState){
        window.history.replaceState({"Test":"Test"},"Test",prevState.url)
        PageState.activeComponent = prevState.component;
        self.appendChild(prevState.component);
      }
    });
  }

  update(route:string,params?:Record<string, string>){
    this.removeChild(PageState.activeComponent)

    PageState.pushComponentToHistory(PageState.activeComponent, window.location.href)
    const componentToAdd = this.#getComponentAndUpdateUrl(route, params);

    this.appendChild(componentToAdd)
    PageState.activeComponent = componentToAdd;
  }

  #getComponentAndUpdateUrl(route:string, params?:Record<string, string>): HTMLElement{

    if(route === GROUP_PAGE_ROUTE) {
      this.#updateUrlWithQuery("groups.html", params)
      return new GroupPageComponent();
    } else if(route === GROUP_EVENT_PAGE_ROUTE) {
      if(params){
        const url = `/groups/event.html?id=${params.id}&groupId=${params.groupId}`
        this.#updateUrlWithQuery(url);
        return new EventDetailsComponent();
      } else {
        throw new Error(`Cannot navigate to group event page route without parameters`)
      }
    } else {
      throw new Error(`No route defined for ${route}`);
    }
  }

  #updateUrlWithQuery(route:string, params?: any){
    let updatedUrl = route;
    if(params){
      const paramData:string[] = [];
      Object.keys(params).forEach((function(key){
        paramData.push(`${key}=${encodeURIComponent(params[key])}`)
      }));

      if(paramData.length ===1){
        updatedUrl += `?${paramData.join("&")}`
      }
    }
    window.history.pushState({"Test":"Test"},"Test",updatedUrl)
  }
}


if (!customElements.get("page-component")) {
  customElements.define("page-component", PageComponent);
}


