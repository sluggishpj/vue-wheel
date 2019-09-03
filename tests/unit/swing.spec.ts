import { shallowMount } from '@vue/test-utils'

import SwingNum from '@/components/SwingNum/XSwingNum.vue'

describe('SwingNum', () => {
  it('renders props.num when passed', () => {
    const num = 123456
    const numStr = num.toString()
    const wrapper = shallowMount(SwingNum, {
      propsData: { num }
    })

    expect(wrapper.text()).toContain(numStr[0])
    expect(wrapper.findAll('.num-list').length).toEqual(numStr.length)
  })
})
