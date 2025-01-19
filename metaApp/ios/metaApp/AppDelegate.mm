#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#import <RNReanimated/SchedulerModule.h> // Reanimated module

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"metaApp";

  // Initial Props can be customized here
  self.initialProps = @{};

  // Initialize the bridge and register Reanimated JSI module
  RCTBridge *bridge = [self initializeBridgeWithLaunchOptions:launchOptions];

  // Set the bridge for your application
  self.bridge = bridge;

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// Method to return the bundle URL based on build type (DEBUG or RELEASE)
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Initialize the RCTBridge and register the Reanimated JSI Module
- (RCTBridge *)initializeBridgeWithLaunchOptions:(NSDictionary *)launchOptions {
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

    // Register Reanimated JSI module
    [ReanimatedJSIModule registerForJsiRuntime:bridge.jsRuntime];

    return bridge;
}

@end
