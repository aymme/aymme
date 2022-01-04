import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { EndpointLinkComponent } from './endpoint-link.component';
import { BadgeModule } from 'primeng/badge';

export default {
  title: 'EndpointLinkComponent',
  component: EndpointLinkComponent,
  decorators: [
    moduleMetadata({
      imports: [BadgeModule],
    }),
  ],
} as Meta<EndpointLinkComponent>;

const Template: Story<EndpointLinkComponent> = (args: EndpointLinkComponent) => ({
  component: EndpointLinkComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  method: 'GET',
  path: '/api/arrangement-manager/client-api/v2/productsummary',
};
