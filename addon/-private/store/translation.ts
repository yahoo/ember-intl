/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import type { MessageFormatElement } from 'intl-messageformat-parser';
import flatten, { NestedStructure } from 'ember-intl/-private/utils/flatten';

export type TranslationAST = MessageFormatElement[];

/**
 * @remarks
 * `tests/unit/helpers/t-test.ts` has a test that asserts that numbers are
 * acceptable as translations and converted to strings.
 */
export type Translations = NestedStructure<string | number>;

class Translation {
  private readonly translations = new Map<string, string>();
  private readonly _localeName: string;

  get localeName() {
    return this._localeName;
  }

  constructor(localeName: string) {
    this._localeName = localeName;
  }

  addTranslations(translations: Translations): void {
    const flatTranslations = flatten(translations);

    for (const key in flatTranslations) {
      let translation = flatTranslations[key];

      // If it's not a string, coerce it to one.
      if (typeof translation !== 'string') {
        translation = `${translation}`;
      }

      this.translations.set(key, translation);
    }
  }

  find(key: string): void | { original: string } {
    if (this.has(key)) {
      return {
        original: this.translations.get(key)!,
      };
    }
  }

  has(key: string): boolean {
    return this.translations.has(key);
  }

  toObject(): Record<string, string> {
    const obj: Record<string, string> = {};
    this.translations.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }
}

export default Translation;
