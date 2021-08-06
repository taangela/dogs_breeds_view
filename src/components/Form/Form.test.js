import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";
import { shallow } from "enzyme";
import Form from "./Form";

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<Form />);
it("should render <Form/>", () => {
  expect(wrapper);
});
