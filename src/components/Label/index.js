'use strict'

/**
 * Created by dyson on 2017/02/06.
 */

import React from 'react'
import styles from './styles.css'
import classNames from 'classnames/bind'
const css = classNames.bind(styles)

class Label extends React.Component {
  constructor (props) {
    super(props)
    this.renderSeriesData = this.renderSeriesData.bind(this)

    this.containerStyle = {
      backgroundColor: this.props.backgroundColor,
      height: this.props.height,
      width: this.props.width,
      borderRadius: this.props.borderRadius
    }

    this.titleStyle = {
      fontSize: this.props.fontSize,
      color: this.props.titleColor,
      textAlign: this.props.textAlign
    }

    this.dataStyle = {
      fontSize: this.props.fontSize,
      color: this.props.dataColor,
      textAlign: this.props.textAlign
    }
  }

  renderSeriesData (data) {
    return (
      <div className={css('rowCotainer')}>
        <div className={css('title')} style={this.titleStyle}>
          { data.title }
        </div>
        <div className={css('data')} style={this.dataStyle}>
          { data.content }
        </div>
      </div>
    )
  }

  render () {
    if (this.props.seriesData) {
      return (
        <div className={css('container')} style={this.containerStyle} >
          <div className={css('rowCotainer')}>
            <div className={css('title')} style={this.titleStyle}>
              { this.props.title }
            </div>
            <div className={css('data')} style={this.dataStyle}>
              { this.props.number }
            </div>
          </div>
          {
                        this.props.seriesData.map(data => {
                          return this.renderSeriesData(data)
                        })
                    }
        </div>
      )
    } else {
      return (
        <div className={css('container')} style={this.containerStyle} >
          <div className={css('rowCotainer')}>
            <div className={css('title')} style={this.titleStyle}>
              { this.props.title }
            </div>
            <div className={css('data')} style={this.dataStyle}>
              { this.props.number }
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Label
