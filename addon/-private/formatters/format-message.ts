/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import memoize from 'fast-memoize';
import { htmlSafe, isHTMLSafe } from '@ember/string';
import type { SafeString } from '@ember/template/-private/handlebars';
import IntlMessageFormat from 'intl-messageformat';
import type { Options, Formats } from 'intl-messageformat';
import parse from '../utils/parse';
import Formatter from './-base';
import { TranslationAST } from '../store/translation';

const {
  Handlebars: {
    // @ts-ignore
    Utils: { escapeExpression },
  },
} = Ember;

function escapeOptions<T extends Record<string, unknown>>(object?: T) {
  if (typeof object !== 'object') {
    return;
  }

  let escapedOpts = {} as { [K in keyof T]: T[K] extends SafeString ? string : T[K] };

  (Object.keys(object) as (keyof T)[]).forEach((key) => {
    let val = object[key];

    if (isHTMLSafe(val)) {
      // If the option is an instance of Ember SafeString,
      // we don't want to pass it into the formatter, since the
      // formatter won't know what to do with it. Instead, we cast
      // the SafeString to a regular string using `toHTML`.
      // Since it was already marked as safe we should *not* escape it.
      // @ts-ignore
      escapedOpts[key] = val.toHTML();
    } else if (typeof val === 'string') {
      escapedOpts[key] = escapeExpression(val);
    } else {
      // @ts-ignore
      escapedOpts[key] = val; // copy as-is
    }
  });

  return escapedOpts;
}

/**
 * @private
 * @hide
 * @TODO Should not extend from abstract base class.
 */
export default class FormatMessage extends Formatter<Options> {
  // @ts-ignore This class does not match the abstract base class.
  createNativeFormatter = memoize(
    (ast: TranslationAST, locales: string | string[], formatConfig?: Partial<Formats>) => {
      return new IntlMessageFormat(ast as any, locales, formatConfig, {
        ignoreTag: true,
      });
    }
  );

  // @ts-ignore This class does not match the abstract base class.
  format(
    locale: string | string[],
    maybeAst: string | TranslationAST,
    options?: Partial<Record<string, unknown>> & { htmlSafe: boolean }
  ) {
    let ast = maybeAst as TranslationAST;

    if (typeof maybeAst === 'string') {
      // maybe memoize?  it's not a typical hot path since we
      // parse when translations are pushed to ember-intl.
      // This is only used if inlining a translation i.e.,
      // {{format-mesage "Hi {name}"}}
      ast = parse(maybeAst);
    }

    const isHTMLSafe = options && options.htmlSafe;
    const formatterInstance = this.createNativeFormatter(ast, locale, this.readFormatConfig());
    const escapedOptions = isHTMLSafe ? escapeOptions(options) : options;
    const result = formatterInstance.format(escapedOptions) as string;

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
