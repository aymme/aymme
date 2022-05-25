import { NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

// Solid
import {
  faArrowRight as fasArrowRight,
  faArrows as fasArrows,
  faBook as fasBook,
  faCaretDown as fasCaretDown,
  faChevronLeft as fasChevronLeft,
  faChevronRight as fasChevronRight,
  faCog as fasCog,
  faCompressAlt as fasCompressAlt,
  faCopy as fasCopy,
  faDownload as fasDownload,
  faEdit as fasEdit,
  faExpandAlt as fasExpandAlt,
  faInfo as fasInfo,
  faInfoCircle as fasInfoCircle,
  faMinus as fasMinus,
  faMoon as fasMoon,
  faPlus as fasPlus,
  faPlusCircle as fasPlusCircle,
  faProjectDiagram as fasProjectDiagram,
  faSearch as fasSearch,
  faSlidersH as fasSlidersH,
  faSquarePlus as fasSquarePlus,
  faSun as fasSun,
  faSync as fasSync,
  faTasksAlt as fasTasksAlt,
  faTimes as fasTimes,
  faUpload as fasUpload,
  faUser as fasUser,
} from '@fortawesome/free-solid-svg-icons';

// Brand
import {
  faAngular as fabAngular,
  faJs as fabJs,
  faReact as fabReact,
  faVuejs as fabVuejs,
} from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [],
})
export class IconsModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      // Solid
      fasEdit,
      fasTimes,
      fasSync,
      fasSlidersH,
      fasPlusCircle,
      fasDownload,
      fasUpload,
      fasArrows,
      fasCog,
      fasExpandAlt,
      fasCompressAlt,
      fasCopy,
      fasArrowRight,
      fasChevronLeft,
      fasChevronRight,
      fasTasksAlt,
      fasInfoCircle,
      fasUser,
      fasBook,
      fasSun,
      fasMoon,
      fasPlus,
      fasCaretDown,
      fasMinus,
      fasProjectDiagram,
      fasInfo,
      fasSearch,
      fasSquarePlus,

      // Brand
      fabAngular,
      fabVuejs,
      fabReact,
      fabJs
    );
  }
}
