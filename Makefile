# Adds --harmony_generators flag when available/necessary
node ?= node
node_flags ?= $(shell $(node) --v8-options | grep generators | cut -d ' ' -f 3)

mocha = $(node) $(node_flags) ./node_modules/.bin/_mocha

node_modules: package.json
	@npm install
	@touch node_modules # hack to fix mtime after npm installs

test: node_modules
	@$(mocha)

.PHONY: test
