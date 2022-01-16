import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { EndpointOptionsComponent } from './endpoint-options.component';

export default {
  title: 'EndpointOptionsComponent!',
  component: EndpointOptionsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<EndpointOptionsComponent>;

const Template: Story<EndpointOptionsComponent> = (args: EndpointOptionsComponent) => ({
  component: EndpointOptionsComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
