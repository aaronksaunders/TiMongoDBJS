/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"vzSjNA7dH4M6U3dOC91n4FSkV6rfDCKm"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"aDfJN6wpT7nAet5kUQFhfTn20OFTk0fS"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"BGJSMHzq4lcnKk4krrDekyXTxyVPYWNX"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"PeJoXmhJz1AkKSNN8oda42QLaczDCXsE"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"5voQZZm9tdGlGoqZ8hRL8Bclb56uf67p"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"dGreB1Kv4v1kAzAEkQqxv3Ad0NvEb8G9"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
