#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"ti.cloud",@"name",@"ti.cloud",@"moduleid",@"2.0.5",@"version",@"1056b5d2-2bb5-4339-b930-297637aeec4e",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
