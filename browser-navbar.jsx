'use strict'

function normalizedUri(input) {
  var prefix = 'http://';

  if (!/^([^:\/]+)(:\/\/)/g.test(input) && !prefix.includes(input)) {
    input = prefix + input;
  }

  return input;
}

function isDecendant(parent, child) {
  var node = child;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

class BrowserNavbarBtn extends React.Component {
  render() {
    return <a href="#" className={this.props.disabled?'disabled':''} title={this.props.title} onClick={this.props.onClick}><i className={'fa fa-'+this.props.icon} /></a>
  }
}

class BrowserMenuBtn extends React.Component {
  getInitialState() {
    return {menuVisible: false};
  }

  render() {
    return <span>
      <BrowserNavbarBtn title={this.props.title} icon={this.props.icon} onClick={this.onClick} />
      <Portal
        isOpen={this.state.menuVisible}
      >
        <p>Hello world!</p>
      </Portal>
    </span>
  }
  
  onClick() {
    // when the button is clicked toggle menu visibility
    this.setState({menuVisible: !this.state.menuVisible})
  }
  
  onMenuClosed() {
    this.setState({menuVisible: false})
  }
}

class BrowserNavbarLocation extends React.Component {
  onKeyDown(e) {
    if (e.keyCode == 13)
      this.props.onEnterLocation(normalizedUri(e.target.value))
  }

  onChange(e) {
    this.props.onChangeLocation(normalizedUri(e.target.value))
  }

  render() {
    return <input type="text" onKeyDown={this.onKeyDown} onChange={this.onChange} onContextMenu={this.props.onContextMenu} value={this.props.page.location} />
  }
}


class BrowserNavbar extends React.Component {
  render() {
    return <div id="browser-navbar">
      <BrowserNavbarBtn title="Rewind" icon="angle-double-left fa-lg" onClick={this.props.onClickHome} disabled={!this.props.page.canGoBack} />
      <BrowserNavbarBtn title="Back" icon="angle-left fa-lg" onClick={this.props.onClickBack} disabled={!this.props.page.canGoBack} />
      <BrowserNavbarBtn title="Forward" icon="angle-right fa-lg" onClick={this.props.onClickForward} disabled={!this.props.page.canGoForward} />
      <BrowserNavbarBtn title="Refresh" icon="circle-thin" onClick={this.props.onClickRefresh} disabled={!this.props.page.canRefresh} />
      <div className="input-group">
        <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} onChangeLocation={this.props.onChangeLocation} onContextMenu={this.props.onLocationContextMenu} page={this.props.page} />
      </div>
      <BrowserMenuBtn title="Menu" icon="bars" />
    </div>
  }
}
