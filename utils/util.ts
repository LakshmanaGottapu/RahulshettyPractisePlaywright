import { Locator } from "@playwright/test";

export const fetchDropdownOptions = async (optionsLocator: Locator) => await optionsLocator.evaluateAll((options:HTMLOptionElement[]) => options.filter(opt => opt.value).map(opt => ({value: opt.value, label:opt.innerText.trim()})))
