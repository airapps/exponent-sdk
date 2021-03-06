import React from 'react';
import ReactNative from 'react-native';

import Asset from '../Asset';

const {
  Component,
  PropTypes,
} = React;

const {
  StyleSheet,
  requireNativeComponent,
  NativeModules,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

export default class Video extends Component {
  static RESIZE_MODE_CONTAIN = 'contain';
  static RESIZE_MODE_COVER = 'cover';
  static RESIZE_MODE_STRETCH = 'stretch';

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  seek = (time) => {
    this.setNativeProps({ seek: time });
  };

  presentFullscreenPlayer = () => {
    this.setNativeProps({ fullscreen: true });
  };

  dismissFullscreenPlayer = () => {
    this.setNativeProps({ fullscreen: false });
  };

  _assignRoot = (component) => {
    this._root = component;
  };

  _onLoadStart = (event) => {
    if (this.props.onLoadStart) {
      this.props.onLoadStart(event.nativeEvent);
    }
  };

  _onLoad = (event) => {
    if (this.props.onLoad) {
      this.props.onLoad(event.nativeEvent);
    }
  };

  _onError = (event) => {
    if (this.props.onError) {
      this.props.onError(event.nativeEvent);
    }
  };

  _onProgress = (event) => {
    if (this.props.onProgress) {
      this.props.onProgress(event.nativeEvent);
    }
  };

  _onSeek = (event) => {
    if (this.props.onSeek) {
      this.props.onSeek(event.nativeEvent);
    }
  };

  _onEnd = (event) => {
    if (this.props.onEnd) {
      this.props.onEnd(event.nativeEvent);
    }
  };

  _onFullscreenPlayerWillPresent = (event) => {
    if (this.props.onFullscreenPlayerWillPresent) {
      this.props.onFullscreenPlayerWillPresent(event.nativeEvent);
    }
  };

  _onFullscreenPlayerDidPresent = (event) => {
    if (this.props.onFullscreenPlayerDidPresent) {
      this.props.onFullscreenPlayerDidPresent(event.nativeEvent);
    }
  };

  _onFullscreenPlayerWillDismiss = (event) => {
    if (this.props.onFullscreenPlayerWillDismiss) {
      this.props.onFullscreenPlayerWillDismiss(event.nativeEvent);
    }
  };

  _onFullscreenPlayerDidDismiss = (event) => {
    if (this.props.onFullscreenPlayerDidDismiss) {
      this.props.onFullscreenPlayerDidDismiss(event.nativeEvent);
    }
  };

  _onReadyForDisplay = (event) => {
    if (this.props.onReadyForDisplay) {
      this.props.onReadyForDisplay(event.nativeEvent);
    }
  };

  _onPlaybackStalled = (event) => {
    if (this.props.onPlaybackStalled) {
      this.props.onPlaybackStalled(event.nativeEvent);
    }
  };

  _onPlaybackResume = (event) => {
    if (this.props.onPlaybackResume) {
      this.props.onPlaybackResume(event.nativeEvent);
    }
  };

  _onPlaybackRateChange = (event) => {
    if (this.props.onPlaybackRateChange) {
      this.props.onPlaybackRateChange(event.nativeEvent);
    }
  };

  render() {
    let {
      source,
      resizeMode,
    } = this.props;

    // Is it an asset module?
    if (typeof source === 'number') {
      source = { uri: Asset.fromModule(source).uri };
    }

    let uri = source.uri;
    if (uri && uri.match(/^\//)) {
      uri = `file://${uri}`;
    }

    const isNetwork = !!(uri && uri.match(/^https?:/));
    const isAsset = !!(uri && uri.match(/^(assets-library|file|content):/));

    let nativeResizeMode;
    if (resizeMode === Video.RESIZE_MODE_STRETCH) {
      nativeResizeMode = NativeModules.UIManager.ExponentVideo.Constants.ScaleToFill;
    } else if (resizeMode === Video.RESIZE_MODE_CONTAIN) {
      nativeResizeMode = NativeModules.UIManager.ExponentVideo.Constants.ScaleAspectFit;
    } else if (resizeMode === Video.RESIZE_MODE_COVER) {
      nativeResizeMode = NativeModules.UIManager.ExponentVideo.Constants.ScaleAspectFill;
    } else {
      nativeResizeMode = NativeModules.UIManager.ExponentVideo.Constants.ScaleNone;
    }

    const nativeProps = Object.assign({}, this.props);
    Object.assign(nativeProps, {
      style: [styles.base, nativeProps.style],
      resizeMode: nativeResizeMode,
      src: {
        uri,
        isNetwork,
        isAsset,
        type: source.type || 'mp4',
      },
      onVideoLoadStart: this._onLoadStart,
      onVideoLoad: this._onLoad,
      onVideoError: this._onError,
      onVideoProgress: this._onProgress,
      onVideoSeek: this._onSeek,
      onVideoEnd: this._onEnd,
      onVideoFullscreenPlayerWillPresent: this._onFullscreenPlayerWillPresent,
      onVideoFullscreenPlayerDidPresent: this._onFullscreenPlayerDidPresent,
      onVideoFullscreenPlayerWillDismiss: this._onFullscreenPlayerWillDismiss,
      onVideoFullscreenPlayerDidDismiss: this._onFullscreenPlayerDidDismiss,
      onReadyForDisplay: this._onReadyForDisplay,
      onPlaybackStalled: this._onPlaybackStalled,
      onPlaybackResume: this._onPlaybackResume,
      onPlaybackRateChange: this._onPlaybackRateChange,
    });

    return (
      <ExponentVideo
        ref={this._assignRoot}
        {...nativeProps}
      />
    );
  }
}

Video.propTypes = {
  /* Native only */
  src: PropTypes.object,
  seek: PropTypes.number,
  fullscreen: PropTypes.bool,

  /* Wrapper component */
  source: PropTypes.oneOfType([
    PropTypes.object, // Source object like { uri: 'http//foo/bar.mp4' }
    PropTypes.number, // Asset module like require('./foo/bar.mp4')
  ]),
  resizeMode: PropTypes.string,
  repeat: PropTypes.bool,
  paused: PropTypes.bool,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  rate: PropTypes.number,
  controls: PropTypes.bool,
  currentTime: PropTypes.number,
  onLoadStart: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onProgress: PropTypes.func,
  onSeek: PropTypes.func,
  onEnd: PropTypes.func,
  onFullscreenPlayerWillPresent: PropTypes.func,
  onFullscreenPlayerDidPresent: PropTypes.func,
  onFullscreenPlayerWillDismiss: PropTypes.func,
  onFullscreenPlayerDidDismiss: PropTypes.func,
  onReadyForDisplay: PropTypes.func,
  onPlaybackStalled: PropTypes.func,
  onPlaybackResume: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,

  /* Required by react-native */
  scaleX: React.PropTypes.number,
  scaleY: React.PropTypes.number,
  translateX: React.PropTypes.number,
  translateY: React.PropTypes.number,
  rotation: React.PropTypes.number,
  ...View.propTypes,
};

const ExponentVideo = requireNativeComponent('ExponentVideo', Video, {
  nativeOnly: {
    src: true,
    seek: true,
    fullscreen: true,
    onVideoLoadStart: true,
    onVideoLoad: true,
    onVideoError: true,
    onVideoProgress: true,
    onVideoSeek: true,
    onVideoEnd: true,
    onVideoFullscreenPlayerWillPresent: true,
    onVideoFullscreenPlayerDidPresent: true,
    onVideoFullscreenPlayerWillDismiss: true,
    onVideoFullscreenPlayerDidDismiss: true,
  },
});
