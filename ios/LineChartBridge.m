//
//  LineChartBridge.m
//  RNStocks
//
//  Created by jake on 2/19/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNTLineChart, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(data, NSArray)
  RCT_EXPORT_VIEW_PROPERTY(showLegend, BOOL)
  RCT_EXPORT_VIEW_PROPERTY(showAxis, BOOL)
  RCT_EXPORT_VIEW_PROPERTY(days, NSInteger)
  RCT_EXPORT_VIEW_PROPERTY(fillColor, NSString)
@end
