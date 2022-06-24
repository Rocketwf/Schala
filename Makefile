.PHONY: clean_all clean core_deps gui_deps deps core_prepare core run all

clean:
	rm -rf ./core/dist

clean_all: clean
	rm -rf ./{core,schala-gui}/node_modules

core_deps:
	(cd core; yarn)

gui_deps:
	(cd schala-gui; yarn)

update_core_in_gui:
	(cd schala-gui; yarn add ../core)

deps: core_deps gui_deps

core_prepare:
	(cd core; tsc -b --verbose)

core: core_prepare gui_deps

gui:
	(cd schala-gui; quasar dev)

run: core_deps core gui_deps update_core_in_gui gui

lint:
	(cd core; yarn eslint ./src/ --ext .js,.jsx,.ts,.tsx --fix)

core_test:
	(cd core; yarn test)

all: core_deps core core_test gui_deps gui

