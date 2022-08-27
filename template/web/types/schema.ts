import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from 'sanity-codegen';

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Code of Conduct
 *
 *
 */
export interface CodeOfConduct extends SanityDocument {
  _type: 'codeOfConduct';

  /**
   * Code of Conduct — `bodyPortableText`
   *
   * A code of conduct is one of several things that helps you to make sure that all participants will have a great time!
   */
  body?: BodyPortableText;
}

/**
 * Event Information
 *
 *
 */
export interface EventInformation extends SanityDocument {
  _type: 'eventInformation';

  /**
   * Event name — `string`
   *
   *
   */
  name?: string;

  /**
   * Description — `text`
   *
   * Describe your event for search engines and social media.
   */
  description?: string;

  /**
   * Event image — `mainImage`
   *
   *
   */
  image?: MainImage;

  /**
   * Schedule — `schedule`
   *
   * From when to when will the event last?
   */
  schedule?: Schedule;

  /**
   * Venue — `venue`
   *
   * Where will the event take place?
   */
  venue?: Venue;

  /**
   * Ticket link — `url`
   *
   *
   */
  ticket?: string;

  /**
   * Favicon image — `image`
   *
   * Make sure the image is square, and preferrably an SVG
   */
  favicon?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Keywords — `array`
   *
   * Add keywords that describes your event.
   */
  keywords?: Array<SanityKeyed<string>>;

  /**
   * Organizers — `array`
   *
   * Publish one or more persons and set a reference to them here.
   */
  organizers?: Array<SanityKeyedReference<Person>>;
}

/**
 * Person
 *
 *
 */
export interface Person extends SanityDocument {
  _type: 'person';

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   * Some frontends will require a slug to be set to be able to show the person
   */
  slug?: { _type: 'slug'; current: string };

  /**
   * Image — `mainImage`
   *
   *
   */
  image?: MainImage;

  /**
   * Biography — `bioPortableText`
   *
   *
   */
  bio?: BioPortableText;
}

/**
 * Session
 *
 *
 */
export interface Session extends SanityDocument {
  _type: 'session';

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Image — `mainImage`
   *
   *
   */
  image?: MainImage;

  /**
   * Persons — `array`
   *
   * Who is responsible for this session?
   */
  persons?: Array<SanityKeyed<PersonReference>>;

  /**
   * Session type — `string`
   *
   *
   */
  sessionType?: 'keynote' | 'talk' | 'break' | 'firesideChat' | 'panel';

  /**
   * Short summary — `text`
   *
   * For previews, social media etc.
   */
  summary?: string;

  /**
   * Description — `bodyPortableText`
   *
   *
   */
  description?: BodyPortableText;
}

/**
 * Program
 *
 *
 */
export interface Program extends SanityDocument {
  _type: 'program';

  /**
   * Schedule — `array`
   *
   *
   */
  schedule?: Array<SanityKeyed<ScheduleItem>>;
}

export type Venue = {
  _type: 'venue';
  /**
   * Name of venue — `string`
   *
   *
   */
  name?: string;

  /**
   * City — `string`
   *
   *
   */
  city?: string;

  /**
   * Post code — `string`
   *
   *
   */
  postCode?: string;

  /**
   * Country — `string`
   *
   *
   */
  country?: string;
};

export type Schedule = {
  _type: 'schedule';
  /**
   * From — `datetime`
   *
   *
   */
  from?: string;

  /**
   * To — `datetime`
   *
   *
   */
  to?: string;
};

export type ScheduleItem = {
  _type: 'scheduleItem';
  /**
   * Session — `reference`
   *
   *
   */
  session?: SanityReference<Session>;

  /**
   * Duration — `number`
   *
   * Duration (in minutes)
   */
  duration?: number;
};

export type MainImage = {
  _type: 'mainImage';
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;

  /**
   * Alternative text — `string`
   *
   * Important for SEO and accessiblity.
   */
  alt?: string;
};

export type BioPortableText = Array<SanityKeyed<SanityBlock>>;

export type BodyPortableText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: 'image';
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type EventReference = {
  _type: 'eventReference';
  /**
   * event — `reference`
   *
   *
   */
  event?: SanityReference<EventInformation>;
};

export type PersonReference = {
  _type: 'personReference';
  /**
   * person — `reference`
   *
   *
   */
  person?: SanityReference<Person>;
};

export type Documents =
  | CodeOfConduct
  | EventInformation
  | Person
  | Session
  | Program;
