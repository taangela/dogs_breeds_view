import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";
import { shallow } from "enzyme";
import Main from "./Main";

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<Main />);
it("should render <Main/>", () => {
  expect(wrapper);
});
