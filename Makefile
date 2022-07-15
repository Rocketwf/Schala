.PHONY: clean_all clean core_deps gui_deps server_deps server deps core_prepare core run all

clean_all:
	rm -rf ./{core,schala-gui,server}/node_modules
	rm -rf ./{core,schala-gui,server}/yarn.lock

core_deps:
	(cd core; yarn)

gui_deps:
	(cd schala-gui; yarn)

server_deps:
	(cd server; yarn)

update_core_in_gui:
	(cd schala-gui; yarn add ../core)

deps: server_deps core_deps gui_deps

core_prepare:
	(cd core; tsc -b --verbose)

server_prepare:
	(cd server; tsc -b --verbose)

core: core_prepare update_core_in_gui

lint:
	(cd server; yarn eslint ./src/ --ext .js,.jsx,.ts,.tsx --fix)
	(cd core; yarn eslint ./src/ --ext .js,.jsx,.ts,.tsx --fix)
	(cd schala-gui; yarn lint --fix)

core_test:
	(cd core;tsc -b --verbose; yarn test)

server_test:
	(cd server;tsc -b --verbose; yarn test)

gui_test:
	(cd schala-gui; yarn test:unit:ci)

build_spa: core_deps core gui_deps update_core_in_gui
	(cd schala-gui; yarn build)

build_electron: core_deps core gui_deps update_core_in_gui
	(cd schala-gui; quasar build -m electron)

run: server_prepare core
	(cd schala-gui;yarn all)

all: server_deps server_prepare core_deps core gui_deps