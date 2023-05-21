// Flags: --expose-internals
'use strict';
require('../common');
const fixtures = require('../common/fixtures');
const { internalBinding } = require('internal/test/binding');
const { internalModuleReadJSON } = internalBinding('fs');
const { strictEqual } = require('assert');
{
  // Non-existing file
  const result = internalModuleReadJSON('nosuchfile');
  strictEqual(result.length, 0);
}
{
  // Invalid JSON
  const result = internalModuleReadJSON(fixtures.path('empty.txt'));
  strictEqual(result.length, 0);
}
{
  const result = internalModuleReadJSON(fixtures.path('empty-with-bom.txt'));
  strictEqual(result.length, 0);
}
{
  const filename = fixtures.path('require-bin/package.json');
  const {
    0: includes_keys,
    1: name,
    2: main,
    3: exports,
    4: imports,
    5: type,
    6: shouldParseExports,
    7: shouldParseImports,
  } = internalModuleReadJSON(filename);
  strictEqual(includes_keys, true);
  strictEqual(name, 'req');
  strictEqual(main, './lib/req.js');
  strictEqual(exports, undefined);
  strictEqual(imports, undefined);
  strictEqual(type, undefined);
  strictEqual(shouldParseExports, false);
  strictEqual(shouldParseImports, false);
}
