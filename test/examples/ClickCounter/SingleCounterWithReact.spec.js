import {expect} from 'chai'
import jsdomify from 'jsdomify'

describe('SingleCounterWithReact example', function() {

  before(function() {
    jsdomify.create()
  })

  after(function() {
    jsdomify.destroy()
  })

  let ReactTestUtils = require('react-addons-test-utils')
  let Recycle = require('../../../src/index').default
  let ReactDOM = require('../../../src/index').ReactDOM
  let SingleCounterWithReact = require('../../../examples/ClickCounter/SingleCounterWithReact').default

  it('should change state on button click', function() {
    var renderedComponent = ReactTestUtils.renderIntoDocument(Recycle(SingleCounterWithReact))
    let componentEl = ReactDOM.findDOMNode(renderedComponent)
    let buttonEl = componentEl.querySelector('button')
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);

    buttonEl.dispatchEvent(evt)
    buttonEl.dispatchEvent(evt)

    expect(renderedComponent.state.timesClicked).to.equal(2)
  });

});