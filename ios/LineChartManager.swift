//
//  TestView.swift
//  RNStocks
//
//  Created by jake on 2/19/23.
//

import UIKit

@objc(RNTLineChart)
class RNTLineChart: RCTViewManager {
  
  override func view() -> UIView! {
    let view = RNTLineChartView()
    return view
  }
    
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
