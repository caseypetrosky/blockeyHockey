import { c as create_ssr_component, j as compute_rest_props, e as escape, a as add_attribute, d as each, k as spread, m as escape_attribute_value, l as escape_object, s as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { z } from "zod";
/* empty css                                                          */import { s as superForm } from "../../../../chunks/SuperDebug.svelte_svelte_type_style_lang.js";
const SimpleAutocomplete_svelte_svelte_type_style_lang = "";
const css = {
  code: '.autocomplete.svelte-75ckfb.svelte-75ckfb{min-width:200px;display:inline-block;max-width:100%;position:relative;vertical-align:top;height:2.25em}.autocomplete.svelte-75ckfb.svelte-75ckfb:not(.hide-arrow):not(.is-loading)::after{border:3px solid;border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:0.625em;margin-top:-0.4375em;pointer-events:none;position:absolute;top:50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:center;transform-origin:center;width:0.625em;border-color:#3273dc;right:1.125em;z-index:4}.autocomplete.show-clear.svelte-75ckfb.svelte-75ckfb:not(.hide-arrow)::after{right:2.3em}.autocomplete.svelte-75ckfb .svelte-75ckfb{box-sizing:border-box}.autocomplete-input.svelte-75ckfb.svelte-75ckfb{font:inherit;width:100%;height:100%;padding:5px 11px}.autocomplete.svelte-75ckfb:not(.hide-arrow) .autocomplete-input.svelte-75ckfb{padding-right:2em}.autocomplete.show-clear.svelte-75ckfb:not(.hide-arrow) .autocomplete-input.svelte-75ckfb{padding-right:3.2em}.autocomplete.hide-arrow.show-clear.svelte-75ckfb .autocomplete-input.svelte-75ckfb{padding-right:2em}.autocomplete-list.svelte-75ckfb.svelte-75ckfb{background:#fff;position:relative;width:100%;overflow-y:auto;z-index:99;padding:10px 0;top:0px;border:1px solid #999;max-height:calc(15 * (1rem + 10px) + 15px);user-select:none}.autocomplete-list.svelte-75ckfb.svelte-75ckfb:empty{padding:0}.autocomplete-list-item.svelte-75ckfb.svelte-75ckfb{padding:5px 15px;color:#333;cursor:pointer;line-height:1}.autocomplete-list-item.confirmed.svelte-75ckfb.svelte-75ckfb{background-color:#789fed;color:#fff}.autocomplete-list-item.selected.svelte-75ckfb.svelte-75ckfb{background-color:#2e69e2;color:#fff}.autocomplete-list-item-no-results.svelte-75ckfb.svelte-75ckfb{padding:5px 15px;color:#999;line-height:1}.autocomplete-list-item-create.svelte-75ckfb.svelte-75ckfb{padding:5px 15px;line-height:1}.autocomplete-list-item-loading.svelte-75ckfb.svelte-75ckfb{padding:5px 15px;line-height:1}.autocomplete-list.hidden.svelte-75ckfb.svelte-75ckfb{visibility:hidden}.autocomplete.show-clear.svelte-75ckfb .autocomplete-clear-button.svelte-75ckfb{cursor:pointer;display:block;text-align:center;position:absolute;right:0.1em;padding:0.3em 0.6em;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);z-index:4}.autocomplete.svelte-75ckfb:not(.show-clear) .autocomplete-clear-button.svelte-75ckfb{display:none}.autocomplete.svelte-75ckfb select.svelte-75ckfb{display:none}.autocomplete.is-multiple.svelte-75ckfb .input-container.svelte-75ckfb{height:auto;box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.1);border-radius:4px;border:1px solid #b5b5b5;padding-left:0.4em;padding-right:0.4em;display:flex;flex-wrap:wrap;align-items:stretch;background-color:#fff}.autocomplete.is-multiple.svelte-75ckfb .tag.svelte-75ckfb{display:flex;margin-top:0.5em;margin-bottom:0.3em}.autocomplete.is-multiple.svelte-75ckfb .tag.is-delete.svelte-75ckfb{cursor:pointer}.autocomplete.is-multiple.svelte-75ckfb .tags.svelte-75ckfb{margin-right:0.3em;margin-bottom:0}.autocomplete.is-multiple.svelte-75ckfb .autocomplete-input.svelte-75ckfb{display:flex;width:100%;flex:1 1 50px;min-width:3em;border:none;box-shadow:none;background:none}',
  map: null
};
function safeFunction(theFunction, argument) {
  if (typeof theFunction !== "function") {
    console.error("Not a function: " + theFunction + ", argument: " + argument);
    return void 0;
  }
  let result;
  try {
    result = theFunction(argument);
  } catch (error) {
    console.warn("Error executing Autocomplete function on value: " + argument + " function: " + theFunction);
  }
  return result;
}
function safeStringFunction(theFunction, argument) {
  let result = safeFunction(theFunction, argument);
  if (result === void 0 || result === null) {
    result = "";
  }
  if (typeof result !== "string") {
    result = result.toString();
  }
  return result;
}
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
const SimpleAutocomplete = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showList;
  let hasSelection;
  let clearable;
  let locked;
  let $$restProps = compute_rest_props($$props, [
    "items",
    "searchFunction",
    "labelFieldName",
    "keywordsFieldName",
    "valueFieldName",
    "labelFunction",
    "keywordsFunction",
    "valueFunction",
    "keywordsCleanFunction",
    "textCleanFunction",
    "beforeChange",
    "onChange",
    "onFocus",
    "onBlur",
    "onCreate",
    "selectFirstIfEmpty",
    "minCharactersToSearch",
    "maxItemsToShowInList",
    "multiple",
    "create",
    "ignoreAccents",
    "matchAllKeywords",
    "sortByMatchedKeywords",
    "itemFilterFunction",
    "itemSortFunction",
    "lock",
    "delay",
    "localFiltering",
    "localSorting",
    "cleanUserText",
    "lowercaseKeywords",
    "closeOnBlur",
    "orderableSelection",
    "hideArrow",
    "showClear",
    "clearText",
    "showLoadingIndicator",
    "noResultsText",
    "loadingText",
    "moreItemsText",
    "createText",
    "placeholder",
    "className",
    "inputClassName",
    "inputId",
    "name",
    "selectName",
    "selectId",
    "title",
    "html5autocomplete",
    "autocompleteOffValue",
    "readonly",
    "dropdownClassName",
    "disabled",
    "noInputStyles",
    "required",
    "debug",
    "tabindex",
    "selectedItem",
    "value",
    "highlightedItem",
    "text",
    "highlightFilter"
  ]);
  let { items = [] } = $$props;
  let { searchFunction = false } = $$props;
  let { labelFieldName = void 0 } = $$props;
  let { keywordsFieldName = labelFieldName } = $$props;
  let { valueFieldName = void 0 } = $$props;
  let { labelFunction = function(item) {
    if (item === void 0 || item === null) {
      return "";
    }
    return labelFieldName ? item[labelFieldName] : item;
  } } = $$props;
  let { keywordsFunction = function(item) {
    if (item === void 0 || item === null) {
      return "";
    }
    return keywordsFieldName ? item[keywordsFieldName] : labelFunction(item);
  } } = $$props;
  let { valueFunction = function(item, forceSingle = false) {
    if (item === void 0 || item === null) {
      return item;
    }
    if (!multiple || forceSingle) {
      return valueFieldName ? item[valueFieldName] : item;
    } else {
      return item.map((i) => valueFieldName ? i[valueFieldName] : i);
    }
  } } = $$props;
  let { keywordsCleanFunction = function(keywords) {
    return keywords;
  } } = $$props;
  let { textCleanFunction = function(userEnteredText) {
    return userEnteredText;
  } } = $$props;
  let { beforeChange = function(oldSelectedItem, newSelectedItem) {
    return true;
  } } = $$props;
  let { onChange = function(newSelectedItem) {
  } } = $$props;
  let { onFocus = function() {
  } } = $$props;
  let { onBlur = function() {
  } } = $$props;
  let { onCreate = function(text2) {
    if (debug) {
      console.log("onCreate: " + text2);
    }
  } } = $$props;
  let { selectFirstIfEmpty = false } = $$props;
  let { minCharactersToSearch = 1 } = $$props;
  let { maxItemsToShowInList = 0 } = $$props;
  let { multiple = false } = $$props;
  let { create = false } = $$props;
  let { ignoreAccents = true } = $$props;
  let { matchAllKeywords = true } = $$props;
  let { sortByMatchedKeywords = false } = $$props;
  let { itemFilterFunction = void 0 } = $$props;
  let { itemSortFunction = void 0 } = $$props;
  let { lock = false } = $$props;
  let { delay = 0 } = $$props;
  let { localFiltering = true } = $$props;
  let { localSorting = true } = $$props;
  let { cleanUserText = true } = $$props;
  let { lowercaseKeywords = true } = $$props;
  let { closeOnBlur = false } = $$props;
  let { orderableSelection = false } = $$props;
  let { hideArrow = false } = $$props;
  let { showClear = false } = $$props;
  let { clearText = "&#10006;" } = $$props;
  let { showLoadingIndicator = false } = $$props;
  let { noResultsText = "No results found" } = $$props;
  let { loadingText = "Loading results..." } = $$props;
  let { moreItemsText = "items not shown" } = $$props;
  let { createText = "Not found, add anyway?" } = $$props;
  let { placeholder = void 0 } = $$props;
  let { className = void 0 } = $$props;
  let { inputClassName = void 0 } = $$props;
  let { inputId = void 0 } = $$props;
  let { name = void 0 } = $$props;
  let { selectName = void 0 } = $$props;
  let { selectId = void 0 } = $$props;
  let { title = void 0 } = $$props;
  let { html5autocomplete = void 0 } = $$props;
  let { autocompleteOffValue = "off" } = $$props;
  let { readonly = void 0 } = $$props;
  let { dropdownClassName = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { noInputStyles = false } = $$props;
  let { required = null } = $$props;
  let { debug = false } = $$props;
  let { tabindex = 0 } = $$props;
  let { selectedItem = multiple ? [] : void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { highlightedItem = void 0 } = $$props;
  const uniqueId = "sautocomplete-" + Math.floor(Math.random() * 1e3);
  let input;
  let list;
  let inputContainer;
  let opened = false;
  let loading = false;
  let highlightIndex = -1;
  let { text = void 0 } = $$props;
  let filteredListItems;
  let listItems = [];
  function safeLabelFunction(item) {
    return safeStringFunction(labelFunction, item);
  }
  function safeKeywordsFunction(item) {
    const keywords = safeStringFunction(keywordsFunction, item);
    let result = safeStringFunction(keywordsCleanFunction, keywords);
    result = lowercaseKeywords ? result.toLowerCase().trim() : result;
    if (ignoreAccents) {
      result = removeAccents(result);
    }
    if (debug) {
      console.log("Extracted keywords: '" + result + "' from item: " + JSON.stringify(item));
    }
    return result;
  }
  function prepareListItems() {
    let timerId;
    if (debug) {
      timerId = `Autocomplete prepare list ${inputId ? `(id: ${inputId})` : ""}`;
      console.time(timerId);
      console.log("Prepare items to search");
      console.log("items: " + JSON.stringify(items));
    }
    if (!Array.isArray(items)) {
      console.warn("Autocomplete items / search function did not return array but", items);
      items = [];
    }
    const length = items ? items.length : 0;
    listItems = new Array(length);
    if (length > 0) {
      items.forEach((item, i) => {
        const listItem = getListItem(item);
        if (listItem === void 0) {
          console.log("Undefined item for: ", item);
        }
        listItems[i] = listItem;
      });
    }
    filteredListItems = listItems;
    if (debug) {
      console.log(listItems.length + " items to search");
      console.timeEnd(timerId);
    }
  }
  function getListItem(item) {
    return {
      // keywords representation of the item
      keywords: localFiltering ? safeKeywordsFunction(item) : [],
      // item label
      label: safeLabelFunction(item),
      // store reference to the origial item
      item
    };
  }
  function onSelectedItemChanged() {
    value = valueFunction(selectedItem);
    if (selectedItem && !multiple) {
      text = safeLabelFunction(selectedItem);
    }
    filteredListItems = listItems;
    onChange(selectedItem);
  }
  function unselectItem(tag) {
    if (debug) {
      console.log("unselectItem", tag);
    }
    selectedItem = selectedItem.filter((i) => i !== tag);
    input.focus();
  }
  function highlightFilter(keywords, field) {
    return (item) => {
      let label = item[field];
      const newItem = Object.assign({ highlighted: void 0 }, item);
      newItem.highlighted = label;
      const labelLowercase = label.toLowerCase();
      const labelLowercaseNoAc = ignoreAccents ? removeAccents(labelLowercase) : labelLowercase;
      if (keywords && keywords.length) {
        const positions = [];
        for (let i = 0; i < keywords.length; i++) {
          let keyword = keywords[i];
          if (ignoreAccents) {
            keyword = removeAccents(keyword);
          }
          const keywordLen = keyword.length;
          let pos1 = 0;
          do {
            pos1 = labelLowercaseNoAc.indexOf(keyword, pos1);
            if (pos1 >= 0) {
              let pos2 = pos1 + keywordLen;
              positions.push([pos1, pos2]);
              pos1 = pos2;
            }
          } while (pos1 !== -1);
        }
        if (positions.length > 0) {
          const keywordPatterns = /* @__PURE__ */ new Set();
          for (let i = 0; i < positions.length; i++) {
            const pair = positions[i];
            const pos1 = pair[0];
            const pos2 = pair[1];
            const keywordPattern = labelLowercase.substring(pos1, pos2);
            keywordPatterns.add(keywordPattern);
          }
          for (let keywordPattern of keywordPatterns) {
            if (keywordPattern === "b") {
              continue;
            }
            const reg = new RegExp("(" + keywordPattern + ")", "ig");
            const newHighlighted = newItem.highlighted.replace(reg, "<b>$1</b>");
            newItem.highlighted = newHighlighted;
          }
        }
      }
      return newItem;
    };
  }
  function isConfirmed(listItem) {
    if (!selectedItem) {
      return false;
    }
    if (multiple) {
      return selectedItem.includes(listItem);
    } else {
      return listItem === selectedItem;
    }
  }
  let draggingOver = false;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.searchFunction === void 0 && $$bindings.searchFunction && searchFunction !== void 0)
    $$bindings.searchFunction(searchFunction);
  if ($$props.labelFieldName === void 0 && $$bindings.labelFieldName && labelFieldName !== void 0)
    $$bindings.labelFieldName(labelFieldName);
  if ($$props.keywordsFieldName === void 0 && $$bindings.keywordsFieldName && keywordsFieldName !== void 0)
    $$bindings.keywordsFieldName(keywordsFieldName);
  if ($$props.valueFieldName === void 0 && $$bindings.valueFieldName && valueFieldName !== void 0)
    $$bindings.valueFieldName(valueFieldName);
  if ($$props.labelFunction === void 0 && $$bindings.labelFunction && labelFunction !== void 0)
    $$bindings.labelFunction(labelFunction);
  if ($$props.keywordsFunction === void 0 && $$bindings.keywordsFunction && keywordsFunction !== void 0)
    $$bindings.keywordsFunction(keywordsFunction);
  if ($$props.valueFunction === void 0 && $$bindings.valueFunction && valueFunction !== void 0)
    $$bindings.valueFunction(valueFunction);
  if ($$props.keywordsCleanFunction === void 0 && $$bindings.keywordsCleanFunction && keywordsCleanFunction !== void 0)
    $$bindings.keywordsCleanFunction(keywordsCleanFunction);
  if ($$props.textCleanFunction === void 0 && $$bindings.textCleanFunction && textCleanFunction !== void 0)
    $$bindings.textCleanFunction(textCleanFunction);
  if ($$props.beforeChange === void 0 && $$bindings.beforeChange && beforeChange !== void 0)
    $$bindings.beforeChange(beforeChange);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0)
    $$bindings.onChange(onChange);
  if ($$props.onFocus === void 0 && $$bindings.onFocus && onFocus !== void 0)
    $$bindings.onFocus(onFocus);
  if ($$props.onBlur === void 0 && $$bindings.onBlur && onBlur !== void 0)
    $$bindings.onBlur(onBlur);
  if ($$props.onCreate === void 0 && $$bindings.onCreate && onCreate !== void 0)
    $$bindings.onCreate(onCreate);
  if ($$props.selectFirstIfEmpty === void 0 && $$bindings.selectFirstIfEmpty && selectFirstIfEmpty !== void 0)
    $$bindings.selectFirstIfEmpty(selectFirstIfEmpty);
  if ($$props.minCharactersToSearch === void 0 && $$bindings.minCharactersToSearch && minCharactersToSearch !== void 0)
    $$bindings.minCharactersToSearch(minCharactersToSearch);
  if ($$props.maxItemsToShowInList === void 0 && $$bindings.maxItemsToShowInList && maxItemsToShowInList !== void 0)
    $$bindings.maxItemsToShowInList(maxItemsToShowInList);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.create === void 0 && $$bindings.create && create !== void 0)
    $$bindings.create(create);
  if ($$props.ignoreAccents === void 0 && $$bindings.ignoreAccents && ignoreAccents !== void 0)
    $$bindings.ignoreAccents(ignoreAccents);
  if ($$props.matchAllKeywords === void 0 && $$bindings.matchAllKeywords && matchAllKeywords !== void 0)
    $$bindings.matchAllKeywords(matchAllKeywords);
  if ($$props.sortByMatchedKeywords === void 0 && $$bindings.sortByMatchedKeywords && sortByMatchedKeywords !== void 0)
    $$bindings.sortByMatchedKeywords(sortByMatchedKeywords);
  if ($$props.itemFilterFunction === void 0 && $$bindings.itemFilterFunction && itemFilterFunction !== void 0)
    $$bindings.itemFilterFunction(itemFilterFunction);
  if ($$props.itemSortFunction === void 0 && $$bindings.itemSortFunction && itemSortFunction !== void 0)
    $$bindings.itemSortFunction(itemSortFunction);
  if ($$props.lock === void 0 && $$bindings.lock && lock !== void 0)
    $$bindings.lock(lock);
  if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
    $$bindings.delay(delay);
  if ($$props.localFiltering === void 0 && $$bindings.localFiltering && localFiltering !== void 0)
    $$bindings.localFiltering(localFiltering);
  if ($$props.localSorting === void 0 && $$bindings.localSorting && localSorting !== void 0)
    $$bindings.localSorting(localSorting);
  if ($$props.cleanUserText === void 0 && $$bindings.cleanUserText && cleanUserText !== void 0)
    $$bindings.cleanUserText(cleanUserText);
  if ($$props.lowercaseKeywords === void 0 && $$bindings.lowercaseKeywords && lowercaseKeywords !== void 0)
    $$bindings.lowercaseKeywords(lowercaseKeywords);
  if ($$props.closeOnBlur === void 0 && $$bindings.closeOnBlur && closeOnBlur !== void 0)
    $$bindings.closeOnBlur(closeOnBlur);
  if ($$props.orderableSelection === void 0 && $$bindings.orderableSelection && orderableSelection !== void 0)
    $$bindings.orderableSelection(orderableSelection);
  if ($$props.hideArrow === void 0 && $$bindings.hideArrow && hideArrow !== void 0)
    $$bindings.hideArrow(hideArrow);
  if ($$props.showClear === void 0 && $$bindings.showClear && showClear !== void 0)
    $$bindings.showClear(showClear);
  if ($$props.clearText === void 0 && $$bindings.clearText && clearText !== void 0)
    $$bindings.clearText(clearText);
  if ($$props.showLoadingIndicator === void 0 && $$bindings.showLoadingIndicator && showLoadingIndicator !== void 0)
    $$bindings.showLoadingIndicator(showLoadingIndicator);
  if ($$props.noResultsText === void 0 && $$bindings.noResultsText && noResultsText !== void 0)
    $$bindings.noResultsText(noResultsText);
  if ($$props.loadingText === void 0 && $$bindings.loadingText && loadingText !== void 0)
    $$bindings.loadingText(loadingText);
  if ($$props.moreItemsText === void 0 && $$bindings.moreItemsText && moreItemsText !== void 0)
    $$bindings.moreItemsText(moreItemsText);
  if ($$props.createText === void 0 && $$bindings.createText && createText !== void 0)
    $$bindings.createText(createText);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.inputClassName === void 0 && $$bindings.inputClassName && inputClassName !== void 0)
    $$bindings.inputClassName(inputClassName);
  if ($$props.inputId === void 0 && $$bindings.inputId && inputId !== void 0)
    $$bindings.inputId(inputId);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.selectName === void 0 && $$bindings.selectName && selectName !== void 0)
    $$bindings.selectName(selectName);
  if ($$props.selectId === void 0 && $$bindings.selectId && selectId !== void 0)
    $$bindings.selectId(selectId);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.html5autocomplete === void 0 && $$bindings.html5autocomplete && html5autocomplete !== void 0)
    $$bindings.html5autocomplete(html5autocomplete);
  if ($$props.autocompleteOffValue === void 0 && $$bindings.autocompleteOffValue && autocompleteOffValue !== void 0)
    $$bindings.autocompleteOffValue(autocompleteOffValue);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.dropdownClassName === void 0 && $$bindings.dropdownClassName && dropdownClassName !== void 0)
    $$bindings.dropdownClassName(dropdownClassName);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.noInputStyles === void 0 && $$bindings.noInputStyles && noInputStyles !== void 0)
    $$bindings.noInputStyles(noInputStyles);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.debug === void 0 && $$bindings.debug && debug !== void 0)
    $$bindings.debug(debug);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.selectedItem === void 0 && $$bindings.selectedItem && selectedItem !== void 0)
    $$bindings.selectedItem(selectedItem);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.highlightedItem === void 0 && $$bindings.highlightedItem && highlightedItem !== void 0)
    $$bindings.highlightedItem(highlightedItem);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.highlightFilter === void 0 && $$bindings.highlightFilter && highlightFilter !== void 0)
    $$bindings.highlightFilter(highlightFilter);
  $$result.css.add(css);
  {
    searchFunction || prepareListItems();
  }
  {
    onSelectedItemChanged();
  }
  highlightedItem = filteredListItems && highlightIndex && highlightIndex >= 0 && highlightIndex < filteredListItems.length ? filteredListItems[highlightIndex].item : null;
  showList = opened;
  hasSelection = multiple && selectedItem && selectedItem.length > 0 || !multiple && selectedItem;
  clearable = showClear || (lock || multiple) && hasSelection;
  locked = lock && hasSelection;
  return `<div class="${[
    escape(className ? className : "", true) + " autocomplete select is-fullwidth " + escape(uniqueId, true) + " svelte-75ckfb",
    (hideArrow || !items.length ? "hide-arrow" : "") + " " + (multiple ? "is-multiple" : "") + " " + (clearable ? "show-clear" : "") + " " + (showLoadingIndicator && loading ? "is-loading" : "")
  ].join(" ").trim()}"><select${add_attribute("name", selectName, 0)}${add_attribute("id", selectId, 0)} ${multiple ? "multiple" : ""} class="svelte-75ckfb">${!multiple && hasSelection ? `<option${add_attribute("value", valueFunction(selectedItem, true), 0)} selected class="svelte-75ckfb">${escape(safeLabelFunction(selectedItem))}</option>` : `${multiple && hasSelection ? `${each(selectedItem, (i) => {
    return `<option${add_attribute("value", valueFunction(i, true), 0)} selected class="svelte-75ckfb">${escape(safeLabelFunction(i))} </option>`;
  })}` : ``}`}</select> <div class="input-container svelte-75ckfb"${add_attribute("this", inputContainer, 0)}>${multiple && hasSelection ? `${each(selectedItem, (tagItem, i) => {
    return `<div${add_attribute("draggable", true, 0)} class="${["svelte-75ckfb", draggingOver === i ? "is-active" : ""].join(" ").trim()}">${slots.tag ? slots.tag({
      label: safeLabelFunction(tagItem),
      item: tagItem,
      unselectItem
    }) : ` <div class="tags has-addons svelte-75ckfb"><span class="tag svelte-75ckfb">${escape(safeLabelFunction(tagItem))}</span> <span class="tag is-delete svelte-75ckfb"></span></div> `} </div>`;
  })}` : ``} <input${spread(
    [
      { type: "text" },
      {
        class: escape(inputClassName ? inputClassName : "", true) + " " + escape(noInputStyles ? "" : "input autocomplete-input", true)
      },
      {
        id: escape_attribute_value(inputId ? inputId : "")
      },
      {
        autocomplete: escape_attribute_value(html5autocomplete ? "on" : autocompleteOffValue)
      },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { name: escape_attribute_value(name) },
      { disabled: disabled || null },
      { required: required || null },
      { title: escape_attribute_value(title) },
      { readonly: readonly || locked || null },
      {
        tabindex: escape_attribute_value(tabindex)
      },
      escape_object($$restProps)
    ],
    { classes: "svelte-75ckfb" }
  )}${add_attribute("this", input, 0)}${add_attribute("value", text, 0)}> ${clearable ? `<span class="autocomplete-clear-button svelte-75ckfb"><!-- HTML_TAG_START -->${clearText}<!-- HTML_TAG_END --></span>` : ``}</div> <div class="${escape(dropdownClassName ? dropdownClassName : "", true) + " autocomplete-list " + escape(showList ? "" : "hidden", true) + " is-fullwidth svelte-75ckfb"}"${add_attribute("this", list, 0)}>${filteredListItems && filteredListItems.length > 0 ? `${slots["dropdown-header"] ? slots["dropdown-header"]({
    nbItems: filteredListItems.length,
    maxItemsToShowInList
  }) : ``} ${each(filteredListItems, (listItem, i) => {
    return `${listItem && (maxItemsToShowInList <= 0 || i < maxItemsToShowInList) ? `<div class="${[
      "autocomplete-list-item svelte-75ckfb",
      (i === highlightIndex ? "selected" : "") + " " + (isConfirmed(listItem.item) ? "confirmed" : "")
    ].join(" ").trim()}">${slots.item ? slots.item({
      item: listItem.item,
      label: listItem.highlighted ? listItem.highlighted : listItem.label
    }) : ` ${listItem.highlighted ? `<!-- HTML_TAG_START -->${listItem.highlighted}<!-- HTML_TAG_END -->` : `<!-- HTML_TAG_START -->${listItem.label}<!-- HTML_TAG_END -->`} `} </div>` : ``}`;
  })} ${slots["dropdown-footer"] ? slots["dropdown-footer"]({
    nbItems: filteredListItems.length,
    maxItemsToShowInList
  }) : ` ${maxItemsToShowInList > 0 && filteredListItems.length > maxItemsToShowInList ? `${moreItemsText ? `<div class="autocomplete-list-item-no-results svelte-75ckfb">...${escape(filteredListItems.length - maxItemsToShowInList)} ${escape(moreItemsText)}</div>` : ``}` : ``} `}` : `${`${create ? `<div class="autocomplete-list-item-create svelte-75ckfb">${slots.create ? slots.create({ createText }) : `${escape(createText)}`}</div>` : `${noResultsText ? `<div class="autocomplete-list-item-no-results svelte-75ckfb">${slots["no-results"] ? slots["no-results"]({ noResultsText }) : `${escape(noResultsText)}`}</div>` : ``}`}`}`}</div></div> `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let $teamform, $$unsubscribe_teamform;
  let $gameForm, $$unsubscribe_gameForm;
  let $gameErrors, $$unsubscribe_gameErrors;
  let { data } = $$props;
  const newPlayerSchema = z.object({
    username: z.string().min(3).max(16),
    number: z.number().min(0).max(99),
    teamId: z.string().min(1).max(4),
    goalie: z.boolean(),
    contractType: z.enum(["Pro", "Superstar", "Amateur"]),
    contractLength: z.number().min(1).max(3),
    contractPrice: z.number().min(1500).max(15e3)
  });
  const newTeamSchema = z.object({
    name: z.string().min(3),
    leagueId: z.number(),
    team_owner: z.string().min(3),
    color: z.string().min(3),
    id: z.string().min(1).max(4),
    description: z.string()
  });
  const newGameScehma = z.object({
    gameTellRaw: z.string(),
    leagueId: z.number(),
    isPlayoffs: z.boolean(),
    homeTeamGoalie1: z.object({
      saves: z.number(),
      shotsAgainst: z.number()
    }),
    homeTeamGoalie2: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number()
    }),
    homeTeamGoalie3: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number()
    }),
    awayTeamGoalie1: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number()
    }),
    awayTeamGoalie2: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number()
    }),
    awayTeamGoalie3: z.object({
      username: z.string(),
      saves: z.number(),
      shotsAgainst: z.number()
    })
  });
  const { form, errors, enhance } = superForm(data.newPlayerForm, {
    validators: newPlayerSchema,
    // Reset the form upon a successful result
    resetForm: true,
    // On ActionResult error, render the nearest +error.svelte page
    onError: "apply",
    // No message when navigating away from a modified form
    taintedMessage: null,
    multipleSubmits: "prevent"
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  const { form: teamform, erors: teamErrors, enhance: teamenhance } = superForm(data.newTeamForm, {
    validators: newTeamSchema,
    // Reset the form upon a successful result
    resetForm: true,
    // On ActionResult error, render the nearest +error.svelte page
    onError: "apply",
    // No message when navigating away from a modified form
    taintedMessage: null,
    multipleSubmits: "prevent"
  });
  $$unsubscribe_teamform = subscribe(teamform, (value) => $teamform = value);
  const { form: gameForm, errors: gameErrors, enhance: gameEnhance } = superForm(data.newGameForm, {
    dataType: "json",
    validators: newGameScehma,
    // Reset the form upon a successful result
    resetForm: true,
    // On ActionResult error, render the nearest +error.svelte page
    onError: "apply",
    // No message when navigating away from a modified form
    taintedMessage: null,
    multipleSubmits: "prevent"
  });
  $$unsubscribe_gameForm = subscribe(gameForm, (value) => $gameForm = value);
  $$unsubscribe_gameErrors = subscribe(gameErrors, (value) => $gameErrors = value);
  let teams = [];
  let contractTypes = [
    { value: "Superstar", name: "Superstar" },
    { value: "Pro", name: "Pro" },
    { value: "Amateur", name: "Amateur" }
  ];
  let lengths = [
    { value: 1, name: "1 season" },
    { value: 2, name: "2 seasons" },
    { value: 3, name: "3 seasons" }
  ];
  let leagues = [
    { value: 1, name: "BHL" },
    { value: 2, name: "NAMHL" },
    { value: 3, name: "JBHL" }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        teams = data.team ? data.team.map((team) => ({ value: team.id, name: team.name })) : [];
      }
    }
    $$rendered = `<div class="container mx-auto mt-4 text-white"><div class="flex gap-4" data-svelte-h="svelte-13wmwep"><h1 class="text-3xl font-semibold text-gray-900 dark:text-white underline">Admin Panel</h1> <a href="/admin/panel/playerUpdate" class="text-3xl font-semibold text-gray-900 dark:text-white">Player editing table</a></div> <div class="grid grid-cols-2"><form method="POST" action="?/newPlayerForm"><h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-sbbzjx">Create A New Player</h3> <div class="form-control w-full max-w-xs"><label class="label text-white" for="username" data-svelte-h="svelte-wyod9i">Username</label> <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="username" placeholder="Username" required${add_attribute("value", $form.username, 0)}> ${$errors.username ? `<small class="text-red-500">${escape($errors.username)}</small>` : ``}</div> <div class="form-control w-full max-w-xs"><label class="label text-white" for="number" data-svelte-h="svelte-emwg8u">Number</label> <input class="input input-bordered input-accent w-full max-w-xs" type="number" name="number" placeholder="Number" required${add_attribute("value", $form.number, 0)}> ${$errors.number ? `<small class="text-red-500">${escape($errors.number)}</small>` : ``}</div> <div class="w-full max-w-xs"><label for="teamId" data-svelte-h="svelte-1j59yqs">Team ID</label> <select class="select select-accent w-full max-w-xs" name="teamId">${each(teams, (team) => {
      return `<option${add_attribute("value", team.value, 0)}>${escape(team.name)}</option>`;
    })}</select> ${$errors.teamId ? `<small class="text-red-500">${escape($errors.teamId)}</small>` : ``}</div> <div class="w-full max-w-xs form-control"><label class="label text-white cursor-pointer" for="goalie"><span class="label-text" data-svelte-h="svelte-1lpv39b">Is this player a goalie?</span> <input name="goalie" type="checkbox" class="checkbox"${add_attribute("checked", $form.goalie, 1)}></label> ${$errors.goalie ? `<small class="text-red-500">${escape($errors.goalie)}</small>` : ``} <div class="w-full max-w-xs"><label for="contractPrice" data-svelte-h="svelte-1vsgl3y">Contract Price</label> <input class="input input-bordered input-accent w-full max-w-xs" type="number" name="contractPrice" placeholder="Contract Price" required${add_attribute("value", $form.contractPrice, 0)}> ${$errors.contractPrice ? `<small class="text-red-500">${escape($errors.contractPrice)}</small>` : ``}</div> <div class="w-full max-w-xs"><label for="contractType" data-svelte-h="svelte-1f2vqma">Contract Type</label> <select class="select select-accent w-full max-w-xs" name="contractType">${each(contractTypes, (contractType) => {
      return `<option${add_attribute("value", contractType.value, 0)}>${escape(contractType.name)}</option>`;
    })}</select> ${$errors.contractType ? `<small class="text-red-500">${escape($errors.contractType)}</small>` : ``}</div> <div class="w-full max-w-xs"><label for="contractLength" data-svelte-h="svelte-1cybonm">Contract Length</label> <select class="select select-accent w-full max-w-xs" name="contractLength">${each(lengths, (length) => {
      return `<option${add_attribute("value", length.value, 0)}>${escape(length.name)}</option>`;
    })}</select> ${$errors.contractLength ? `<small class="text-red-500">${escape($errors.contractLength)}</small>` : ``}</div> <button type="submit" class="btn btn-primary my-4 w-full max-w-xs" data-svelte-h="svelte-c0xj8u">Submit New Player</button></div></form> <form method="POST" action="?/newTeamForm"><h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-ca1wul">Create A New Team</h3> <div class="form-control w-full max-w-xs"><label class="label text-white" for="teamName" data-svelte-h="svelte-1jxg488">Team Name</label> <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="teamName" placeholder="Team Name" required${add_attribute("value", $teamform.name, 0)}></div> <div class="form-control w-full max-w-xs"><label class="label text-white" for="teamID" data-svelte-h="svelte-zxzn9s">Team Shorthand</label> <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="teamID" placeholder="Team Shorthand" required${add_attribute("value", $teamform.id, 0)}></div> <div class="w-full max-w-xs"><label for="leagueId" data-svelte-h="svelte-1qpolgs">Team League</label> <select class="select select-accent w-full max-w-xs" name="leagueId">${each(leagues, (league) => {
      return `<option${add_attribute("value", league.value, 0)}>${escape(league.name)}</option>`;
    })}</select></div> <div class="form-control w-full max-w-xs"><label class="label text-white" for="team_owner" data-svelte-h="svelte-nf3iw7">Team Owner</label> <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="team_owner" placeholder="Team Owner" required${add_attribute("value", $teamform.team_owner, 0)}></div> <div class="form-control w-full max-w-xs"><label class="label text-white" for="color" data-svelte-h="svelte-pd54x0">Team Color Code</label> <input class="input input-bordered input-accent w-full max-w-xs" type="text" name="color" placeholder="#FFFFFF" required${add_attribute("value", $teamform.color, 0)}></div> <div class="form-control w-full max-w-xs"><label class="label text-white" for="description" data-svelte-h="svelte-y8ker6">Team Page Description</label> <textarea class="textarea textarea-accent w-full max-w-xs" type="text" name="description" placeholder="Description" required>${escape($teamform.description || "")}</textarea></div> <button type="submit" class="btn btn-primary my-4 w-full max-w-xs" data-svelte-h="svelte-oziue">Submit New Team</button></form></div> <form method="POST" class="" action="?/newGameForm"><h3 class="my-4 text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-cyoh9o">Input a new Game</h3> <div class="w-full "><label for="gameleagueId" data-svelte-h="svelte-xszvz9">Game League</label> <select class="select select-accent w-full " name="gameleagueId">${each(leagues, (league) => {
      return `<option${add_attribute("value", league.value, 0)}>${escape(league.name)}</option>`;
    })}</select> ${$gameErrors.leagueId ? `<small class="text-red-500">${escape($gameErrors.leagueId)}</small>` : ``}</div> <div class="w-fullform-control"><label class="label text-white cursor-pointer" for="playoffs"><span class="label-text" data-svelte-h="svelte-qrgbyw">Is this a playoff game?</span> <input name="playoffs" type="checkbox" class="checkbox"${add_attribute("checked", $gameForm.isPlayoffs, 1)}></label> ${$gameErrors.isPlayoffs ? `<small class="text-red-500">${escape($gameErrors.isPlayoffs)}</small>` : ``}</div> <div class="form-control w-full "><label class="label text-white" for="tellraw" data-svelte-h="svelte-vepk9j">Tell Raw Output</label> <textarea class="textarea textarea-accent w-full" type="text" name="tellraw" placeholder="Tell Raw" required>${escape($gameForm.gameTellRaw || "")}</textarea> ${$gameErrors.gameTellRaw ? `<small class="text-red-500">${escape($gameErrors.gameTellRaw)}</small>` : ``}</div> <div class="form-control w-full gap-3"><label class="label text-white" for="homeTeamGoalie1" data-svelte-h="svelte-1lrquyu">Home Team Goalie 1</label> ${validate_component(SimpleAutocomplete, "AutoComplete").$$render(
      $$result,
      {
        class: "input input-bordered input-accent w-full",
        items: data.goalies.filter((goalie) => goalie.team.leagueId === $gameForm.leagueId).map((goalie) => goalie.username),
        placeholder: "Home Team Goalie 1",
        required: true,
        value: $gameForm.homeTeamGoalie1.username
      },
      {
        value: ($$value) => {
          $gameForm.homeTeamGoalie1.username = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${$gameErrors.homeTeamGoalie1username ? `<small class="text-red-500">${escape($gameErrors.homeTeamGoalie1username)}</small>` : ``} <div class="flex flex-row gap-3"><label class="label text-white" for="homeTeamGoalie1saves" data-svelte-h="svelte-6ypl0q">Home Team Goalie 1 Saves</label> <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie1saves" placeholder="Saves" required${add_attribute("value", $gameForm.homeTeamGoalie1.saves, 0)}> ${$gameErrors.homeTeamGoalie1saves ? `<small class="text-red-500">${escape($gameErrors.homeTeamGoalie1saves)}</small>` : ``} <label class="label text-white" for="homeTeamGoalie1shotsAgainst" data-svelte-h="svelte-sb3nag">Home Team Goalie 1 Shots Against</label> <input class="input input-bordered input-accent max-w-xs" type="number" name="homeTeamGoalie1shotsAgainst" placeholder="Shots Against" required${add_attribute("value", $gameForm.homeTeamGoalie1.shotsAgainst, 0)}> ${$gameErrors.homeTeamGoalie1shotsAgainst ? `<small class="text-red-500">${escape($gameErrors.homeTeamGoalie1shotsAgainst)}</small>` : ``}</div></div> <button type="button" class="btn btn-primary" data-svelte-h="svelte-zvsrto">Show Home Goalie 2</button> <button type="button" class="btn btn-primary" data-svelte-h="svelte-1fx05h0">Show Home Goalie 3</button> ${``} ${``} <div class="form-control w-full gap-3"><label class="label text-white" for="awayTeamGoalie1" data-svelte-h="svelte-97lh5k">Away Team Goalie 1</label> ${validate_component(SimpleAutocomplete, "AutoComplete").$$render(
      $$result,
      {
        class: "input input-bordered input-accent w-full",
        items: data.goalies.filter((goalie) => goalie.team.leagueId === $gameForm.leagueId).map((goalie) => goalie.username),
        placeholder: "Away Team Goalie 1",
        required: true,
        value: $gameForm.awayTeamGoalie1.username
      },
      {
        value: ($$value) => {
          $gameForm.awayTeamGoalie1.username = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${$gameErrors.awayTeamGoalie1username ? `<small class="text-red-500">${escape($gameErrors.awayTeamGoalie1username)}</small>` : ``} <div class="flex flex-row gap-3"><label class="label text-white" for="awayTeamGoalie1saves" data-svelte-h="svelte-1xg2mlu">Away Team Goalie 1 Saves</label> <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie1saves" placeholder="Saves" required${add_attribute("value", $gameForm.awayTeamGoalie1.saves, 0)}> ${$gameErrors.awayTeamGoalie1saves ? `<small class="text-red-500">${escape($gameErrors.awayTeamGoalie1saves)}</small>` : ``} <label class="label text-white" for="awayTeamGoalie1shotsAgainst" data-svelte-h="svelte-1dq2l3q">Away Team Goalie 1 Shots Against</label> <input class="input input-bordered input-accent max-w-xs" type="number" name="awayTeamGoalie1shotsAgainst" placeholder="Shots Against" required${add_attribute("value", $gameForm.awayTeamGoalie1.shotsAgainst, 0)}> ${$gameErrors.awayTeamGoalie1shotsAgainst ? `<small class="text-red-500">${escape($gameErrors.awayTeamGoalie1shotsAgainst)}</small>` : ``}</div></div> <button type="button" class="btn btn-primary" data-svelte-h="svelte-181zoi8">Show Away Goalie 2</button> <button type="button" class="btn btn-primary" data-svelte-h="svelte-1y7wts">Show Away Goalie 3</button> ${``} ${``} <button type="submit" class="btn btn-primary my-4 w-full max-w-xs" data-svelte-h="svelte-5b5mmr">Submit New Game</button></form></div>`;
  } while (!$$settled);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  $$unsubscribe_teamform();
  $$unsubscribe_gameForm();
  $$unsubscribe_gameErrors();
  return $$rendered;
});
export {
  Page as default
};
