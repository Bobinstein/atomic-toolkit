import { Tag } from 'arbundles';
import * as Tags from './tags';

/**
 * Represents the initial state of a tradable asset.
 */
export type TradableAssetInitState = Record<string, any> & {
    /**
     * Ticker for the Asset. eg- ATOMIC
     */
    ticker: string;
    /**
     * Name of the Asset. eg- Atomic Asset
     */
    name: string;
    /**
     * List of Balances for the Asset. eg- { "Z7t5Dw42qalSx9-1u4wINXWayX7Ktu_i3sbc31tSDb4": 1 }
     */
    balances: Record<string, number>;
    /**
     * List of Claimable Addresses for the Asset.
     */
    claimable: {
        /**
         * Arweave Address who called the claim Function.
         */
        from: string;
        /**
         * Quantity of the Asset to be claimed.
         */
        qty: number;
        /**
         * The Arweave Address to which the Asset is to be transferred.
         */
        to: string;
        /**
         * The Transaction ID of the Transaction which called the claim Function.
         */
        txID: string;
    }[];
};

/**
 * Options for creating a tradable asset.
 */
export type CreateTradableAssetOpts = {
    /**
     * The initial state of the asset.
     */
    initialState: TradableAssetInitState;
    /**
     * The discoverability tags associated with the asset.
     */
    discoverability: Tags.DiscoverabilityTags;
    /**
     * The license tags associated with the asset.
     */
    license?: Tags.LicenseTags;
    /**
     * The contract identifier tags associated with the asset.
     */
    contractIdentifier?: Tags.ContractIdentifierTags;
    /**
     * Wether to Index the Asset (Making it tradable on Marketplaces like BazAR)
     *
     * @default true
     */
    indexWithUCM?: boolean;
    /**
     * Additional tags associated with the asset.
     */
    additionalTags?: Tag[];
};

/**
 * Represents a stampable type.
 * @template T - A boolean type parameter.
 * @param T - A boolean value indicating whether the type is stampable.
 * @returns If T is true, returns an object with stampable properties. Otherwise, returns an object with isStampable set to false.
 */
export type StampableType<T extends boolean> = T extends true
    ? {
          isStampable: true;
          owner: string;
          collectionName: string;
          ticker: string;
      }
    : { isStampable: false };

/**
 * Represents the options for a collection.
 */
export type CreateCollectionWithAssetIdsOpts = {
    /**
     * The Atomic Assets to be Included in the collection
     */
    assetIds: string[];
    /**
     * The Collection Specific tags as per specification
     *
     * https://specs.arweave.dev/?tx=4zqtz8-U4LNKjFU4gZ28oKkV6bTlfzJiguqjbMl9R4Q
     */
    collection: Tags.CollectionSpecificTags;
    /**
     * The discoverability tags associated with the asset.
     */
    discoverability: Omit<Tags.DiscoverabilityTags, 'type'> & {
        type: 'Document';
    };
    /**
     * Optional Atomic Assets Tags if you want the Collection to be Stampable.
     *
     * Defaults to false
     */
    stamp?: StampableType<boolean>;
    /**
     * Additional tags associated with the asset.
     */
    additionalTags?: Tag[];
};

/**
 * Options for creating an asset.
 */
export type CreateAssetOpts = {
    /**
     * Asset File can be file or relative path.
     */
    file: File | string;
    /**
     * Asset Tags
     */
    tags: Tags.AssetTags;
};

export type UploadDataOpts = {
    type: 'data' | 'file';
    /**
     * Asset File can be file or relative path.
     */
    data: File | string;
    /**
     * Asset Tags
     */
    tags: Tag[];
};

export type CreateCollectionOpts = {
    /**
     * Atomic assets can be a Array of files or relative paths.
     */
    assets: File[] | string[];
    /**
     * The Collection Thumbnail File or relative path. (recommended size: 300x300)
     */
    thumbnail: File | string;
    /**
     * The Collection Banner File or relative path. (recommended size: 1600x900)
     */
    banner: File | string;
    /**
     * License Tags associated with the Collection. Same License tags will be
     * applied to all the Atomic Assets.
     */
    license: Tags.LicenseTags;
    /**
     * Initial State for the Atomic Assets
     */
    initState: {
        ticker: string;
        balances: Record<string, number>;
    };
    /**
     * The Collection Specific tags as per specification
     */
    collection: Omit<Tags.CollectionSpecificTags, 'thumbnail' | 'banner'>;
    /**
     * The discoverability tags associated with the collection.
     */
    discoverability: Omit<Tags.DiscoverabilityTags, 'type'> & {
        type: 'Document';
    };
    /**
     * Tags associated with stamps. Use this if you want your collection to be stampable.
     */
    stamp?: StampableType<boolean>;
    /**
     * Additional tags associated with the collection.
     */
    additionalTags?: Tag[];
};