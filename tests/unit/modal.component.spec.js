import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import Modal from '../../src/components/Modal'

global.fetch = function () { return false }
global.alert = function (data) { console.info(data) }

describe('Tab.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Modal, {
      props: {
        employee: 200,
        employer: 100
      }
    })
  })

  it('Payment state result fail ', () => {
    expect(wrapper.find('.payment-state').text()).to.contain('Fail');
  })
  it('Payment state result success ', () => {
    expect(wrapper.find('.payment-state').text()).to.not.contain('Success');
  })
  it('Payments match ', () => {
    expect(wrapper.find('.employer').text()).to.contain(wrapper.componentVM.employer);
    expect(wrapper.find('.employee').text()).to.contain(wrapper.componentVM.employee);
  })
  it('Loading weather checks ', async () => {
    expect(wrapper.find('.weather p').text()).to.contain('Loading weather');
    await wrapper.vm.loadingWeather
    expect(wrapper.find('.weather p').text()).not.to.contain('Loading weather');
    expect(wrapper.find('.temp').exists()).to.be.true;
  })

})
