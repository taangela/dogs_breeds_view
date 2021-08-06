import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";
import { shallow } from "enzyme";
import Allmodals from "./Allmodals";

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<Allmodals />);
it("should render <Allmodals/>", () => {
  expect(wrapper);
});
