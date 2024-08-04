# CreatinglyDragAndDrop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## for adding new Element follow these steps:
1. create a standalone component that inherit from BaseElementComponent
2. define a new unique type for that component in ElementType type
3. assign that type to your component in ELEMENT_COMPONENT_MAP
4. add your component ELEMENT_COMPONENT_LIST array (due to Angular's AoT compiler we cant create list of component of the map dynamically)
5. (optional) you can add your default configs for that component in "elements.config.ts" file

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
