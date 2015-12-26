node ?= node

mocha = $(node) $(node_flags) ./node_modules/.bin/_mocha

node_modules: package.json
	@npm install
	@touch node_modules # hack to fix mtime after npm installs

test: node_modules
	@$(mocha)

.PHONY: test
