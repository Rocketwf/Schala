.PHONY: clean_all clean core_deps gui_deps server_deps server deps core_prepare core run all

clean:
	rm -rf ./core/dist

clean_all: clean
	rm -rf ./{core,schala-gui,server}/node_modules

core_deps:
	(cd core; yarn)

gui_deps:
	(cd schala-gui; yarn)

server_deps:
	(cd server; yarn)

update_core_in_gui:
	(cd schala-gui; yarn add ../core)

deps: server_deps core_deps gui_deps

server:
	(cd server; node index.js)

core_prepare:
	(cd core; tsc -b --verbose)

core: core_prepare gui_deps

frontendbackend:
	(cd server;yarn frontendbackend)

run: server_deps core_deps core gui_deps update_core_in_gui frontendbackend

lint:
	(cd server; yarn eslint ./src/ --ext .js,.jsx,.ts,.tsx --fix)
	(cd core; yarn eslint ./src/ --ext .js,.jsx,.ts,.tsx --fix)
	(cd schala-gui; yarn lint --fix)

core_test:
	(cd core;tsc -b --verbose; yarn test)

server_test:
	(cd server;tsc -b --verbose; yarn test)

build_skip_test: core_deps core gui_deps update_core_in_gui
	(cd schala-gui; yarn build)
	

all: server_deps server server_test core_deps core core_test gui_deps frontendbackend

