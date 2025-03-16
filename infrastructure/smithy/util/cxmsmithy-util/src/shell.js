'use strict';

function escapeSpecialCharactersForShell(original) {
	return original.replace(/\\/g, '\\\\').replace(/(\$|\*|!|\)|\()/g, '\\$1');
}

Object.assign(module.exports, {
	escapeSpecialCharactersForShell
});
