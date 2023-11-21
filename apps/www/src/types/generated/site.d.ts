export interface Site {
  default_archetype: string
  notification_types: NotificationTypes
  post_types: PostTypes
  user_tips: UserTips
  trust_levels: TrustLevels
  groups: Group[]
  filters: string[]
  periods: string[]
  top_menu_items: string[]
  anonymous_top_menu_items: string[]
  uncategorized_category_id: number
  user_field_max_length: number
  post_action_types: PostActionType[]
  topic_flag_types: TopicFlagType[]
  can_create_tag: boolean
  can_tag_topics: boolean
  can_tag_pms: boolean
  tags_filter_regexp: string
  top_tags: string[]
  topic_featured_link_allowed_category_ids: number[]
  user_themes: UserTheme[]
  user_color_schemes: any[]
  default_dark_color_scheme: any
  censored_regexp: any[]
  custom_emoji_translation: CustomEmojiTranslation
  watched_words_replace: any
  watched_words_link: any
  categories: Category[]
  markdown_additional_options: MarkdownAdditionalOptions
  hashtag_configurations: HashtagConfigurations2
  hashtag_icons: HashtagIcons
  displayed_about_plugin_stat_groups: any[]
  anonymous_sidebar_sections: AnonymousSidebarSection[]
  tos_url: string
  privacy_policy_url: string
  whos_online_state: WhosOnlineState
  archetypes: Archetype[]
  user_fields: UserField[]
  auth_providers: any[]
}

interface NotificationTypes {
  mentioned: number
  replied: number
  quoted: number
  edited: number
  liked: number
  private_message: number
  invited_to_private_message: number
  invitee_accepted: number
  posted: number
  moved_post: number
  linked: number
  granted_badge: number
  invited_to_topic: number
  custom: number
  group_mentioned: number
  group_message_summary: number
  watching_first_post: number
  topic_reminder: number
  liked_consolidated: number
  post_approved: number
  code_review_commit_approved: number
  membership_request_accepted: number
  membership_request_consolidated: number
  bookmark_reminder: number
  reaction: number
  votes_released: number
  event_reminder: number
  event_invitation: number
  chat_mention: number
  chat_message: number
  chat_invitation: number
  chat_group_mention: number
  chat_quoted: number
  assigned: number
  question_answer_user_commented: number
  watching_category_or_tag: number
  new_features: number
  admin_problems: number
  following: number
  following_created_topic: number
  following_replied: number
  circles_activity: number
}

interface PostTypes {
  regular: number
  moderator_action: number
  small_action: number
  whisper: number
}

interface UserTips {
  first_notification: number
  topic_timeline: number
  post_menu: number
  topic_notification_levels: number
  suggested_topics: number
  admin_guide: number
}

interface TrustLevels {
  newuser: number
  basic: number
  member: number
  regular: number
  leader: number
}

interface Group {
  id: number
  name: string
  flair_url?: string
  flair_bg_color: string
  flair_color?: string
}

interface PostActionType {
  id?: number
  name_key?: string
  name: string
  description: string
  short_description: string
  is_flag: boolean
  is_custom_flag: boolean
}

interface TopicFlagType {
  id?: number
  name_key?: string
  name: string
  description: string
  short_description: string
  is_flag: boolean
  is_custom_flag: boolean
}

interface UserTheme {
  theme_id: number
  name: string
  default: boolean
  color_scheme_id: number
}

interface CustomEmojiTranslation {}

interface Category {
  id: number
  name: string
  color: string
  text_color: string
  slug: string
  topic_count: number
  post_count: number
  position: number
  description: string
  description_text: string
  description_excerpt: string
  topic_url: string
  read_restricted: boolean
  permission: any
  notification_level: number
  topic_template?: string
  has_children: boolean
  sort_order?: string
  sort_ascending?: boolean
  show_subcategory_list: boolean
  num_featured_topics: number
  default_view?: string
  subcategory_list_style: string
  default_top_period: string
  default_list_filter: string
  minimum_required_tags: number
  navigate_to_first_post_after_read: boolean
  custom_fields: CustomFields
  allowed_tags: string[]
  allowed_tag_groups: string[]
  allow_global_tags: boolean
  read_only_banner?: string
  form_template_ids: any[]
  uploaded_logo: any
  uploaded_logo_dark: any
  uploaded_background: any
  required_tag_groups: any[]
  can_edit: boolean
  parent_category_id?: number
}

interface CustomFields {
  has_chat_enabled: any
  enable_accepted_answers?: string
}

interface MarkdownAdditionalOptions {
  chat: Chat
}

interface Chat {
  limited_pretty_text_features: string[]
  limited_pretty_text_markdown_rules: string[]
  hashtag_configurations: HashtagConfigurations
}

interface HashtagConfigurations {
  "topic-composer": string[]
}

interface HashtagConfigurations2 {
  "topic-composer": string[]
}

interface HashtagIcons {
  category: string
  tag: string
}

interface AnonymousSidebarSection {
  id: number
  title: string
  links: Link[]
  slug: string
  public: boolean
  section_type: string
}

interface Link {
  id: number
  name: string
  value: string
  icon: string
  external: boolean
  full_reload: boolean
  segment: string
}

interface WhosOnlineState {
  count: number
  last_message_id: number
  users: User[]
}

interface User {
  id: number
  username: string
  name: string
  avatar_template: string
}

interface Archetype {
  id: string
  name: string
  options: any[]
}

interface UserField {
  id: number
  name: string
  description: string
  field_type: string
  editable: boolean
  required: boolean
  show_on_profile: boolean
  show_on_user_card: boolean
  searchable: boolean
  position: number
}
