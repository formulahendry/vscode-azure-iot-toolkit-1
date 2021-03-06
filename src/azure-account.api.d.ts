// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { Event } from 'vscode';
import { ServiceClientCredentials } from 'ms-rest';
import { AzureEnvironment } from 'ms-rest-azure';
import { SubscriptionModels } from 'azure-arm-resource';

export type AzureLoginStatus = 'Initializing' | 'LoggingIn' | 'LoggedIn' | 'LoggedOut';

export interface AzureAccount {
	readonly status: AzureLoginStatus;
	readonly onStatusChanged: Event<AzureLoginStatus>;
	readonly waitForLogin: () => Promise<boolean>;
	readonly sessions: AzureSession[];
	readonly onSessionsChanged: Event<void>;
	readonly filters: AzureResourceFilter[];
	readonly onFiltersChanged: Event<void>;
	readonly waitForFilters: () => Promise<boolean>;
}

export interface AzureSession {
	readonly environment: AzureEnvironment;
	readonly userId: string;
	readonly tenantId: string;
	readonly credentials: ServiceClientCredentials;
}

export interface AzureResourceFilter {
	readonly session: AzureSession;
	readonly subscription: SubscriptionModels.Subscription;
}

export interface Credentials {
	readSecret(service: string, account: string): Thenable<string | undefined>;
	writeSecret(service: string, account: string, secret: string): Thenable<void>;
	deleteSecret(service: string, account: string): Thenable<boolean>;
}