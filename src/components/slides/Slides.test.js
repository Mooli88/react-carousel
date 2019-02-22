import ShallowRenderer from 'react-test-renderer/shallow';
import DataService from '../../Data.service';
import Slides from './Slides';

let renderer;

beforeEach(_ => {
  renderer = ShallowRenderer.createRenderer();
});
// afterEach

describe('<Slides />', _ => {
  const SlidesCmp = renderer.render(<Slides />);

  it("Should call 'getSlides()' on mount", _ => {
    console.log(SlidesCmp);
  });
});
