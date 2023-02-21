//
//  StockChartView.swift
//  RNStocks
//
//  Created by jake on 2/19/23.
//

import UIKit
import Charts

class RNTLineChartView: UIView {

    @objc var data: [Double] = []
    @objc var showLegend: Bool = false
    @objc var showAxis: Bool = false
    @objc var fillColor: String = "blue"
    @objc var days: Int = 7
    
    private let chartView: LineChartView = {
        let chart = LineChartView()
        chart.pinchZoomEnabled = false
        chart.setScaleEnabled(true)
        chart.xAxis.enabled = false
        chart.drawGridBackgroundEnabled = false
        chart.leftAxis.enabled = false
        chart.rightAxis.enabled = false
        chart.legend.enabled = false
        return chart
    }()

    // MARK: Lifecycle
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addSubview(chartView)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        chartView.frame = bounds
    }

    public func reset() {
        chartView.data = nil
    }
    
    override func didSetProps(_ changedProps: [String]!) {
        var entries = [ChartDataEntry]()
        
        for (index, value) in data.enumerated() {
            entries.append(
                .init(x: Double(index), y: value)
            )
        }
        
        chartView.rightAxis.enabled = showAxis
        chartView.legend.enabled = showLegend
        
        let dataSet = LineChartDataSet(entries: entries, label: "\(days) Days")
      
        if fillColor == "blue" {
          dataSet.fillColor = .systemBlue
        } else if fillColor == "red" {
          dataSet.fillColor = .systemRed
        } else if fillColor == "green" {
          dataSet.fillColor = .systemGreen
        }
        
        dataSet.drawFilledEnabled = true
        dataSet.drawIconsEnabled = false
        dataSet.drawValuesEnabled = false
        dataSet.drawCirclesEnabled = false
        chartView.data = LineChartData(dataSet: dataSet)
    }
}

