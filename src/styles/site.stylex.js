/* Static component styles compiled by StyleX. Grouped media negation preserves
 * exact breakpoint intervals. Explicit null longhands let a shared p/m override
 * replace an earlier axis style, matching the original class composition.
 * Retained --tw-* properties belong to the preserved reset/animation contract. */
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  "appCourseCodePageStyle1": {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": {
      "default": "var(--accent)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--accent) 10%, transparent)"
    },
    "padding": {
      "default": "calc(var(--spacing) * 3)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 4)"
    },
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appCourseCodePageStyle2": {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": {
      "default": "calc(var(--spacing) * 3)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 4)"
    },
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appCourseCodePageStyle3": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": {
      "default": "var(--text-2xl)",
      "@media (min-width:40rem)": "var(--text-3xl)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-2xl--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-3xl--line-height))"
    },
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tighter)",
    "letterSpacing": "var(--tracking-tighter)",
    "color": "var(--accent-foreground)",
    "--tw-leading": null
  },
  "appCourseCodePageStyle4": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": {
      "default": "var(--text-2xl)",
      "@media (min-width:40rem)": "var(--text-3xl)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-2xl--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-3xl--line-height))"
    },
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tighter)",
    "letterSpacing": "var(--tracking-tighter)",
    "color": "var(--foreground)",
    "--tw-leading": null
  },
  "appCourseCodePageStyle5": {
    "minHeight": "100vh",
    "backgroundColor": "var(--background)",
    "fontFamily": "Instrument Sans,system-ui,sans-serif",
    "color": "var(--foreground)"
  },
  "appCourseCodePageStyle6": {
    "position": "fixed",
    "top": "0",
    "right": "0",
    "left": "0",
    "zIndex": "50",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--background)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--background) 80%, transparent)"
    },
    "padding": {
      "default": "calc(var(--spacing) * 4)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 6)"
    },
    "--tw-backdrop-blur": "blur(var(--blur-sm))",
    "WebkitBackdropFilter": "var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)",
    "backdropFilter": "var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appCourseCodePageStyle7": {
    "display": "flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appCourseCodePageStyle8": {
    "height": "calc(var(--spacing) * 4)",
    "width": "calc(var(--spacing) * 4)",
    "transitionProperty": "transform,translate,scale,rotate",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appCourseCodePageStyle9": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": {
      "default": "var(--text-xs)",
      "@media (min-width:40rem)": "var(--text-sm)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-xs--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-sm--line-height))"
    },
    "--tw-leading": null
  },
  "appCourseCodePageStyle10": {
    "display": "flex",
    "alignItems": "center"
  },
  "appCourseCodePageStyle11": {
    "marginInline": "auto",
    "maxWidth": "var(--container-4xl)",
    "paddingInline": {
      "default": "calc(var(--spacing) * 4)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 6)"
    },
    "paddingTop": {
      "default": "calc(var(--spacing) * 20)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 24)"
    },
    "paddingBottom": {
      "default": "calc(var(--spacing) * 8)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 12)"
    },
    "--tw-duration": ".5s",
    "transitionDuration": ".5s",
    "--tw-enter-translate-y": "calc(.1*100%)",
    "--tw-enter-opacity": "0",
    "animationName": "enter",
    "animationDuration": "var(--tw-animation-duration,var(--tw-duration,.15s))",
    "animationTimingFunction": "var(--tw-ease,ease)",
    "animationDelay": "var(--tw-animation-delay,0s)",
    "animationIterationCount": "var(--tw-animation-iteration-count,1)",
    "animationDirection": "var(--tw-animation-direction,normal)",
    "animationFillMode": "var(--tw-animation-fill-mode,none)"
  },
  "appCourseCodePageStyle12": {},
  "appCourseCodePageStyle13": {
    "display": "flex",
    "maxWidth": "100%",
    "flexWrap": "wrap",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)"
  },
  "appCourseCodePageStyle14": {
    "maxWidth": "200px",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "borderColor": {
      "default": "var(--accent-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--accent-foreground) 20%, transparent)"
    },
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appCourseCodePageStyle15": {
    "maxWidth": {
      "default": "150px",
      "@media (min-width:40rem)": "200px"
    },
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-leading": null
  },
  "appCourseCodePageStyle16": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-leading": null
  },
  "appCourseCodePageStyle17": {
    "fontSize": {
      "default": "var(--text-2xl)",
      "@media (min-width:48rem)": "var(--text-5xl)",
      "@media (min-width:40rem) and (not (min-width:48rem))": "var(--text-4xl)"
    },
    "lineHeight": {
      "default": "var(--leading-tight)",
      "@media (min-width:48rem)": "var(--tw-leading,var(--text-5xl--line-height))",
      "@media (min-width:40rem) and (not (min-width:48rem))": "var(--tw-leading,var(--text-4xl--line-height))"
    },
    "--tw-leading": "var(--leading-tight)",
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tight)",
    "letterSpacing": "var(--tracking-tight)",
    "color": "var(--foreground)"
  },
  "appCourseCodePageStyle18": {
    "display": "flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 4)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-lg)",
    "lineHeight": "var(--tw-leading,var(--text-lg--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appCourseCodePageStyle19": {
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "color": "var(--accent-foreground)"
  },
  "appCourseCodePageStyle20": {
    "display": "grid",
    "gridTemplateColumns": {
      "default": "repeat(1,minmax(0,1fr))",
      "@media (min-width:48rem)": "repeat(3,minmax(0,1fr))"
    },
    "gap": "calc(var(--spacing) * 8)"
  },
  "appCourseCodePageStyle21": {
    "gridColumn": {
      "default": null,
      "@media (min-width:48rem)": "span 2/span 2"
    }
  },
  "appCourseCodePageStyle22": {
    "marginBottom": "calc(var(--spacing) * 4)",
    "display": "flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "fontSize": "var(--text-xl)",
    "lineHeight": "var(--tw-leading,var(--text-xl--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "--tw-leading": null
  },
  "appCourseCodePageStyle23": {
    "height": "calc(var(--spacing) * 5)",
    "width": "calc(var(--spacing) * 5)",
    "color": "var(--accent-foreground)"
  },
  "appCourseCodePageStyle24": {
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--card)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--card) 50%, transparent)"
    },
    "--tw-shadow": "0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a)",
    "boxShadow": "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)"
  },
  "appCourseCodePageStyle25": {
    "padding": "calc(var(--spacing) * 6)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appCourseCodePageStyle26": {},
  "appCourseCodePageStyle27": {
    "display": "flex",
    "gap": "calc(var(--spacing) * 3)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--leading-relaxed)",
    "--tw-leading": "var(--leading-relaxed)",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appCourseCodePageStyle28": {
    "marginTop": "var(--spacing)",
    "flexShrink": "0",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "color": {
      "default": "var(--accent-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--accent-foreground) 50%, transparent)"
    }
  },
  "appCourseCodePageStyle29": {
    "marginBottom": "calc(var(--spacing) * 4)",
    "fontSize": "var(--text-xl)",
    "lineHeight": "var(--tw-leading,var(--text-xl--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "--tw-leading": null
  },
  "appCourseCodePageStyle30": {
    "display": "grid",
    "gap": "calc(var(--spacing) * 3)"
  },
  "appCourseCodePageStyle31": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "borderRadius": "calc(var(--radius) - 2px)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": "#0000",
    "backgroundColor": {
      "default": "var(--secondary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--secondary) 30%, transparent)"
    },
    "padding": "calc(var(--spacing) * 4)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null,
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appCourseCodePageStyle32": {},
  "appCourseCodePageStyle33": {
    "overflow": "hidden",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    }
  },
  "appCourseCodePageStyle34": {
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--muted)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted) 50%, transparent)"
    },
    "paddingInline": "calc(var(--spacing) * 6)",
    "paddingBottom": "calc(var(--spacing) * 3)"
  },
  "appCourseCodePageStyle35": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-tracking": "var(--tracking-widest)",
    "letterSpacing": "var(--tracking-widest)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appCourseCodePageStyle36": {
    "padding": "0",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appCourseCodePageStyle37": {
    "display": "grid",
    "gridTemplateColumns": {
      "default": "repeat(2,minmax(0,1fr))",
      "@media (min-width:40rem)": "repeat(4,minmax(0,1fr))"
    }
  },
  "appCourseCodePageStyle38": {
    "marginTop": {
      "default": "var(--spacing)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 2)"
    },
    "fontSize": {
      "default": "9px",
      "@media (min-width:40rem)": "10px"
    },
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "--tw-tracking": "var(--tracking-widest)",
    "letterSpacing": "var(--tracking-widest)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle2": {
    "position": "sticky",
    "top": "0",
    "zIndex": "50",
    "width": "100%",
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "borderColor": "var(--border)",
    "backgroundColor": {
      "default": "var(--background)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--background) 80%, transparent)"
    },
    "--tw-backdrop-blur": "blur(var(--blur-md))",
    "WebkitBackdropFilter": "var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)",
    "backdropFilter": "var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)"
  },
  "appDegreeSlugPageStyle3": {
    "width": "100%",
    "maxWidth": "1400px",
    "marginInline": "auto",
    "display": "flex",
    "height": "calc(var(--spacing) * 14)",
    "alignItems": "center",
    "paddingLeft": "calc(var(--spacing) * 6)"
  },
  "appDegreeSlugPageStyle4": {
    "marginRight": "calc(var(--spacing) * 6)",
    "display": "flex",
    "alignItems": "center",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle5": {
    "fontFamily": "Commit Mono,ui-monospace,monospace"
  },
  "appDegreeSlugPageStyle6": {
    "display": "flex",
    "flex": "1",
    "alignItems": "center",
    "justifyContent": "space-between",
    "overflow": "hidden"
  },
  "appDegreeSlugPageStyle7": {
    "marginRight": "calc(var(--spacing) * 4)",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle8": {
    "display": {
      "default": "none",
      "@media (min-width:40rem)": "block"
    },
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "whiteSpace": "nowrap",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle9": {
    "width": "100%",
    "maxWidth": "1400px",
    "marginInline": "auto",
    "padding": {
      "default": "calc(var(--spacing) * 4)",
      "@media (min-width:64rem)": "calc(var(--spacing) * 12)",
      "@media (min-width:40rem) and (not (min-width:64rem))": "calc(var(--spacing) * 8)"
    },
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreeSlugPageStyle10": {},
  "appDegreeSlugPageStyle11": {
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "borderColor": "var(--border)",
    "paddingBottom": "calc(var(--spacing) * 8)"
  },
  "appDegreeSlugPageStyle12": {
    "marginBottom": "calc(var(--spacing) * 4)",
    "fontSize": {
      "default": "var(--text-3xl)",
      "@media (min-width:40rem)": "var(--text-4xl)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-3xl--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-4xl--line-height))"
    },
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tight)",
    "letterSpacing": "var(--tracking-tight)",
    "color": "var(--foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle13": {
    "display": "flex",
    "flexDirection": {
      "default": "column",
      "@media (min-width:40rem)": "row"
    },
    "gap": "calc(var(--spacing) * 4)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "alignItems": {
      "default": null,
      "@media (min-width:40rem)": "center"
    },
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle14": {
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)"
  },
  "appDegreeSlugPageStyle15": {
    "display": {
      "default": "none",
      "@media (min-width:40rem)": "block"
    },
    "height": "calc(var(--spacing) * 4)",
    "width": "1px",
    "backgroundColor": "var(--border)"
  },
  "appDegreeSlugPageStyle16": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 60%, transparent)"
    }
  },
  "appDegreeSlugPageStyle17": {
    "display": "grid",
    "gridTemplateColumns": {
      "default": "repeat(1,minmax(0,1fr))",
      "@media (min-width:80rem)": "repeat(2,minmax(0,1fr))"
    },
    "gap": {
      "default": "calc(var(--spacing) * 12)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 16)"
    }
  },
  "appDegreeSlugPageStyle18": {
    "marginTop": "calc(var(--spacing) * 16)",
    "borderTopStyle": "var(--tw-border-style)",
    "borderTopWidth": "1px",
    "borderColor": "var(--border)",
    "paddingTop": "calc(var(--spacing) * 8)"
  },
  "appDegreeSlugPageStyle19": {
    "marginBottom": "calc(var(--spacing) * 4)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle21": {
    "display": "flex",
    "alignItems": "flex-start",
    "gap": "calc(var(--spacing) * 3)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle22": {
    "marginTop": "calc(var(--spacing) * .5)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "color": "var(--foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle23": {
    "display": "flex",
    "flexDirection": "column"
  },
  "appDegreeSlugPageStyle24": {
    "marginBottom": "calc(var(--spacing) * 4)",
    "display": "flex",
    "alignItems": "baseline",
    "justifyContent": "space-between",
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "2px",
    "borderColor": "var(--foreground)",
    "paddingBottom": "calc(var(--spacing) * 2)"
  },
  "appDegreeSlugPageStyle25": {
    "fontSize": "var(--text-lg)",
    "lineHeight": "var(--tw-leading,var(--text-lg--line-height))",
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tight)",
    "letterSpacing": "var(--tracking-tight)",
    "color": "var(--foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle26": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle27": {},
  "appDegreeSlugPageStyle28": {
    "position": "relative",
    "overflow": "hidden",
    "overflowX": "auto",
    "borderRadius": "calc(var(--radius) - 4px)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": "var(--border)"
  },
  "appDegreeSlugPageStyle29": {
    "width": "100%",
    "minWidth": {
      "default": "600px",
      "@media (min-width:40rem)": "100%"
    },
    "textAlign": "left",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle30": {
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "borderColor": "var(--border)",
    "backgroundColor": {
      "default": "var(--muted)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted) 30%, transparent)"
    },
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle31": {
    "width": "calc(var(--spacing) * 32)",
    "borderRightStyle": "var(--tw-border-style)",
    "borderRightWidth": "1px",
    "borderColor": "var(--border)",
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2)",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)"
  },
  "appDegreeSlugPageStyle32": {
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2)",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)"
  },
  "appDegreeSlugPageStyle33": {
    "display": {
      "default": "none",
      "@media (min-width:40rem)": "table-cell"
    },
    "width": "calc(var(--spacing) * 16)",
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2)",
    "textAlign": "right",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)"
  },
  "appDegreeSlugPageStyle36": {
    "width": "calc(var(--spacing) * 16)",
    "borderLeftStyle": "var(--tw-border-style)",
    "borderLeftWidth": "1px",
    "borderColor": "var(--border)",
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2)",
    "textAlign": "right",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)"
  },
  "appDegreeSlugPageStyle37": {
    "backgroundColor": "var(--background)"
  },
  "appDegreeSlugPageStyle38": {
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 8)",
    "textAlign": "center",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "fontStyle": "italic",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle40": {
    "paddingLeft": "var(--spacing)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle41": {
    "display": "grid",
    "gap": "calc(var(--spacing) * 4)"
  },
  "appDegreeSlugPageStyle42": {
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appDegreeSlugPageStyle43": {
    "borderRightStyle": "var(--tw-border-style)",
    "borderRightWidth": "1px",
    "borderColor": "var(--border)",
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "color": "var(--muted-foreground)"
  },
  "appDegreeSlugPageStyle44": {
    "WebkitTextDecorationColor": "var(--border)",
    "textDecorationColor": "var(--border)",
    "textUnderlineOffset": "4px"
  },
  "appDegreeSlugPageStyle45": {
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "color": "var(--foreground)"
  },
  "appDegreeSlugPageStyle46": {
    "display": "block",
    "height": "100%",
    "width": "100%"
  },
  "appDegreeSlugPageStyle47": {
    "display": {
      "default": "none",
      "@media (min-width:40rem)": "table-cell"
    },
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "textAlign": "right",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle50": {
    "borderLeftStyle": "var(--tw-border-style)",
    "borderLeftWidth": "1px",
    "borderColor": "var(--border)",
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "textAlign": "right",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "color": "var(--foreground)"
  },
  "appDegreeSlugPageStyle54": {
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 60%, transparent)"
    },
    "fontStyle": "italic"
  },
  "appDegreeSlugPageStyle56": {
    "display": {
      "default": "none",
      "@media (min-width:40rem)": "table-cell"
    },
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "textAlign": "right",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 30%, transparent)"
    },
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle59": {
    "borderLeftStyle": "var(--tw-border-style)",
    "borderLeftWidth": "1px",
    "borderColor": "var(--border)",
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "textAlign": "right",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 50%, transparent)"
    }
  },
  "appDegreeSlugPageStyle69": {
    "borderRadius": ".25rem",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--destructive)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--destructive) 20%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--destructive)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--destructive) 5%, transparent)"
    },
    "padding": "calc(var(--spacing) * 2)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--destructive)",
    "fontStyle": "italic",
    "--tw-leading": null,
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreeSlugPageStyle70": {
    "overflow": "hidden",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": "var(--border)",
    "backgroundColor": "var(--card)",
    "--tw-shadow": "0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a)",
    "boxShadow": "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)"
  },
  "appDegreeSlugPageStyle71": {
    "display": "flex",
    "width": "100%",
    "alignItems": "center",
    "justifyContent": "space-between",
    "backgroundColor": {
      "default": "var(--muted)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted) 30%, transparent)"
    },
    "padding": "calc(var(--spacing) * 4)",
    "textAlign": "left",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreeSlugPageStyle72": {
    "display": "flex",
    "flexDirection": "column",
    "gap": "var(--spacing)"
  },
  "appDegreeSlugPageStyle73": {
    "display": "flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)"
  },
  "appDegreeSlugPageStyle74": {
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "color": "var(--foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle75": {
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle77": {
    "borderRadius": "calc(var(--radius) - 2px)",
    "padding": "var(--spacing)",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreeSlugPageStyle78": {
    "height": "calc(var(--spacing) * 4)",
    "width": "calc(var(--spacing) * 4)",
    "transitionProperty": "transform,translate,scale,rotate",
    "transitionTimingFunction": "var(--ease-out)",
    "transitionDuration": ".2s",
    "--tw-duration": ".2s",
    "--tw-ease": "var(--ease-out)"
  },
  "appDegreeSlugPageStyle79": {
    "borderTopStyle": "var(--tw-border-style)",
    "borderTopWidth": "1px",
    "borderColor": "var(--border)",
    "--tw-duration": ".2s",
    "transitionDuration": ".2s"
  },
  "appDegreeSlugPageStyle80": {
    "backgroundColor": "var(--background)",
    "padding": "calc(var(--spacing) * 2)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreeSlugPageStyle81": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "borderRadius": ".25rem",
    "padding": "calc(var(--spacing) * 2)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreeSlugPageStyle82": {
    "display": "flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 3)"
  },
  "appDegreeSlugPageStyle83": {
    "width": "calc(var(--spacing) * 20)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle84": {
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "color": "var(--foreground)",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle86": {
    "display": "grid",
    "gridTemplateColumns": "repeat(1,minmax(0,1fr))",
    "gap": "calc(var(--spacing) * 6)",
    "padding": "calc(var(--spacing) * 2)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreeSlugPageStyle88": {
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "paddingBottom": "var(--spacing)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appDegreeSlugPageStyle89": {},
  "appDegreeSlugPageStyle90": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "borderRadius": ".25rem",
    "padding": "calc(var(--spacing) * 2)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreePageStyle1": {
    "minHeight": "100vh",
    "backgroundColor": "var(--background)",
    "fontFamily": "Instrument Sans,system-ui,sans-serif",
    "color": "var(--foreground)"
  },
  "appDegreePageStyle2": {
    "marginInline": "auto",
    "maxWidth": "var(--container-5xl)",
    "paddingInline": {
      "default": "calc(var(--spacing) * 4)",
      "@media (min-width:64rem)": "calc(var(--spacing) * 8)",
      "@media (min-width:40rem) and (not (min-width:64rem))": "calc(var(--spacing) * 6)"
    },
    "paddingBlock": "calc(var(--spacing) * 16)"
  },
  "appDegreePageStyle3": {
    "textAlign": "center"
  },
  "appDegreePageStyle4": {
    "marginBottom": "calc(var(--spacing) * 6)",
    "display": "inline-block",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "appDegreePageStyle6": {
    "marginBottom": "calc(var(--spacing) * 4)",
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "3.40282e38px",
    "backgroundColor": {
      "default": "var(--primary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--primary) 5%, transparent)"
    },
    "padding": "calc(var(--spacing) * 3)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreePageStyle7": {
    "height": "calc(var(--spacing) * 8)",
    "width": "calc(var(--spacing) * 8)",
    "color": "var(--primary)"
  },
  "appDegreePageStyle8": {
    "paddingBottom": "calc(var(--spacing) * 2)",
    "fontSize": {
      "default": "var(--text-4xl)",
      "@media (min-width:40rem)": "var(--text-5xl)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-4xl--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-5xl--line-height))"
    },
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tight)",
    "letterSpacing": "var(--tracking-tight)",
    "--tw-leading": null
  },
  "appDegreePageStyle9": {
    "display": "grid",
    "gridTemplateColumns": {
      "default": "repeat(1,minmax(0,1fr))",
      "@media (min-width:64rem)": "repeat(3,minmax(0,1fr))",
      "@media (min-width:40rem) and (not (min-width:64rem))": "repeat(2,minmax(0,1fr))"
    },
    "gap": "calc(var(--spacing) * 6)"
  },
  "appDegreePageStyle10": {
    "height": "100%"
  },
  "appDegreePageStyle11": {
    "display": "flex",
    "height": "100%",
    "flexDirection": "column",
    "borderRadius": "calc(var(--radius) + 8px)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "backgroundColor": "var(--card)",
    "padding": "calc(var(--spacing) * 6)",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": ".3s",
    "--tw-duration": ".3s",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appDegreePageStyle12": {
    "flex": "1"
  },
  "appDegreePageStyle13": {
    "fontSize": "var(--text-lg)",
    "lineHeight": "var(--leading-tight)",
    "--tw-leading": "var(--leading-tight)",
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "color": "var(--foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appDegreePageStyle14": {
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appDegreePageStyle15": {
    "marginTop": "calc(var(--spacing) * 8)",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 50%, transparent)"
    },
    "--tw-leading": null
  },
  "appDegreePageStyle16": {
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appDegreePageStyle17": {
    "height": "calc(var(--spacing) * 4)",
    "width": "calc(var(--spacing) * 4)",
    "transform": "var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)",
    "transitionProperty": "transform,translate,scale,rotate",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appDegreePageStyle18": {
    "gridColumn": "1/-1",
    "borderRadius": "calc(var(--radius) + 4px)",
    "borderStyle": "dashed",
    "borderWidth": "2px",
    "--tw-border-style": "dashed",
    "backgroundColor": {
      "default": "var(--muted)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted) 30%, transparent)"
    },
    "paddingBlock": "calc(var(--spacing) * 16)",
    "textAlign": "center",
    "color": "var(--muted-foreground)"
  },
  "appExplorePageStyle1": {
    "minHeight": "100vh",
    "backgroundColor": "var(--background)",
    "color": "var(--foreground)"
  },
  "appExplorePageStyle2": {
    "position": "fixed",
    "top": "0",
    "right": "0",
    "left": "0",
    "zIndex": "50",
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--background)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--background) 80%, transparent)"
    },
    "paddingInline": "calc(var(--spacing) * 6)",
    "paddingBlock": "calc(var(--spacing) * 4)",
    "--tw-backdrop-blur": "blur(var(--blur-md))",
    "WebkitBackdropFilter": "var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)",
    "backdropFilter": "var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)"
  },
  "appExplorePageStyle3": {
    "marginInline": "auto",
    "display": "flex",
    "maxWidth": "var(--container-7xl)",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  "appExplorePageStyle4": {
    "display": "flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 4)"
  },
  "appExplorePageStyle5": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "appExplorePageStyle6": {
    "height": "calc(var(--spacing) * 4)",
    "width": "1px",
    "backgroundColor": "var(--border)"
  },
  "appExplorePageStyle7": {
    "fontSize": "var(--text-lg)",
    "lineHeight": "var(--tw-leading,var(--text-lg--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "--tw-tracking": "var(--tracking-tight)",
    "letterSpacing": "var(--tracking-tight)",
    "--tw-leading": null
  },
  "appExplorePageStyle9": {
    "height": "100vh",
    "paddingTop": "calc(var(--spacing) * 20)"
  },
  "appLayoutStyle1": {
    "backgroundColor": "var(--background)",
    "fontFamily": "Instrument Sans,system-ui,sans-serif",
    "color": "var(--foreground)",
    "WebkitFontSmoothing": "antialiased",
    "MozOsxFontSmoothing": "grayscale"
  },
  "appMiniProjectsPageStyle8": {
    "display": "flex",
    "flexWrap": "wrap",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)"
  },
  "appMiniProjectsPageStyle9": {
    "borderColor": {
      "default": "var(--accent-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--accent-foreground) 20%, transparent)"
    },
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appMiniProjectsPageStyle19": {
    "padding": "calc(var(--spacing) * 6)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appMiniProjectsPageStyle20": {
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--leading-relaxed)",
    "--tw-leading": "var(--leading-relaxed)",
    "color": "var(--muted-foreground)"
  },
  "appMiniProjectsPageStyle21": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "color": "var(--accent-foreground)"
  },
  "appMiniProjectsPageStyle22": {
    "color": "var(--foreground)"
  },
  "appMiniProjectsPageStyle24": {
    "marginLeft": "calc(var(--spacing) * 4)"
  },
  "appMiniProjectsPageStyle25": {
    "display": "flex",
    "gap": "calc(var(--spacing) * 3)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--leading-relaxed)",
    "--tw-leading": "var(--leading-relaxed)",
    "color": "var(--muted-foreground)"
  },
  "appMiniProjectsPageStyle26": {
    "flexShrink": "0",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "color": "var(--accent-foreground)"
  },
  "appMiniProjectsPageStyle36": {
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "fontStyle": "italic",
    "--tw-leading": null
  },
  "appMiniProjectsPageStyle58": {
    "padding": "calc(var(--spacing) * 6)",
    "textAlign": "center",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appMiniProjectsPageStyle59": {
    "marginBottom": "calc(var(--spacing) * 2)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-5xl)",
    "lineHeight": "var(--tw-leading,var(--text-5xl--line-height))",
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "color": "var(--accent-foreground)",
    "--tw-leading": null
  },
  "appMiniProjectsPageStyle60": {
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-tracking": "var(--tracking-widest)",
    "letterSpacing": "var(--tracking-widest)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "appMiniProjectsPageStyle61": {
    "marginTop": "calc(var(--spacing) * 4)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--leading-relaxed)",
    "--tw-leading": "var(--leading-relaxed)",
    "color": "var(--muted-foreground)"
  },
  "appNotFoundStyle1": {
    "display": "flex",
    "minHeight": "100vh",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "var(--background)",
    "padding": "calc(var(--spacing) * 6)",
    "fontFamily": "Instrument Sans,system-ui,sans-serif",
    "color": "var(--foreground)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appNotFoundStyle2": {
    "width": "100%",
    "maxWidth": "var(--container-md)",
    "textAlign": "center",
    "--tw-duration": ".5s",
    "transitionDuration": ".5s",
    "--tw-enter-translate-y": "calc(.1*100%)",
    "--tw-enter-opacity": "0",
    "animationName": "enter",
    "animationDuration": "var(--tw-animation-duration,var(--tw-duration,.15s))",
    "animationTimingFunction": "var(--tw-ease,ease)",
    "animationDelay": "var(--tw-animation-delay,0s)",
    "animationIterationCount": "var(--tw-animation-iteration-count,1)",
    "animationDirection": "var(--tw-animation-direction,normal)",
    "animationFillMode": "var(--tw-animation-fill-mode,none)"
  },
  "appNotFoundStyle3": {
    "display": "flex",
    "justifyContent": "center"
  },
  "appNotFoundStyle4": {
    "borderRadius": "3.40282e38px",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--destructive)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--destructive) 20%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--destructive)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--destructive) 10%, transparent)"
    },
    "padding": "calc(var(--spacing) * 4)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appNotFoundStyle5": {
    "height": "calc(var(--spacing) * 12)",
    "width": "calc(var(--spacing) * 12)",
    "color": "var(--destructive)"
  },
  "appNotFoundStyle7": {
    "fontSize": {
      "default": "var(--text-2xl)",
      "@media (min-width:40rem)": "var(--text-3xl)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-2xl--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-3xl--line-height))"
    },
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tight)",
    "letterSpacing": "var(--tracking-tight)",
    "--tw-leading": null
  },
  "appNotFoundStyle9": {
    "display": "flex",
    "flexDirection": {
      "default": "column",
      "@media (min-width:40rem)": "row"
    },
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 3)"
  },
  "appNotFoundStyle11": {
    "height": "calc(var(--spacing) * 4)",
    "width": "calc(var(--spacing) * 4)"
  },
  "appNotFoundStyle14": {
    "borderTopStyle": "var(--tw-border-style)",
    "borderTopWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "paddingTop": "calc(var(--spacing) * 6)"
  },
  "appNotFoundStyle15": {
    "marginBottom": "calc(var(--spacing) * 3)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appNotFoundStyle16": {
    "display": "inline-flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--secondary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--secondary) 50%, transparent)"
    },
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": ".3s",
    "--tw-duration": ".3s",
    "--tw-leading": null
  },
  "appNotFoundStyle17": {
    "paddingTop": "calc(var(--spacing) * 4)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 60%, transparent)"
    },
    "--tw-leading": null
  },
  "appPageStyle1": {
    "display": "flex",
    "minHeight": "100vh",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "var(--background)",
    "padding": {
      "default": "calc(var(--spacing) * 4)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 6)"
    },
    "color": "var(--foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": ".3s",
    "--tw-duration": ".3s",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appPageStyle2": {
    "zIndex": "10",
    "display": "flex",
    "width": "100%",
    "maxWidth": "var(--container-3xl)",
    "flexDirection": "column",
    "alignItems": "center",
    "gap": {
      "default": "calc(var(--spacing) * 6)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 8)"
    },
    "textAlign": "center",
    "--tw-duration": ".7s",
    "transitionDuration": ".7s",
    "--tw-enter-translate-y": "calc(.05*100%)",
    "--tw-enter-opacity": "0",
    "--tw-enter-scale": "0",
    "animationName": "enter",
    "animationDuration": "var(--tw-animation-duration,var(--tw-duration,.15s))",
    "animationTimingFunction": "var(--tw-ease,ease)",
    "animationDelay": "var(--tw-animation-delay,0s)",
    "animationIterationCount": "var(--tw-animation-iteration-count,1)",
    "animationDirection": "var(--tw-animation-direction,normal)",
    "animationFillMode": "var(--tw-animation-fill-mode,none)"
  },
  "appPageStyle4": {
    "--tw-gradient-position": "to bottom right in oklab",
    "backgroundImage": "linear-gradient(var(--tw-gradient-stops))",
    "--tw-gradient-from": "var(--foreground)",
    "--tw-gradient-stops": "var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
    "--tw-gradient-to": "var(--muted-foreground)",
    "WebkitBackgroundClip": "text",
    "backgroundClip": "text",
    "fontFamily": "Instrument Sans,system-ui,sans-serif",
    "fontSize": {
      "default": "var(--text-4xl)",
      "@media (min-width:40rem)": "var(--text-6xl)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-4xl--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-6xl--line-height))"
    },
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tight)",
    "letterSpacing": "var(--tracking-tight)",
    "color": "#0000",
    "--tw-leading": null
  },
  "appPageStyle5": {
    "marginInline": "auto",
    "maxWidth": "var(--container-md)",
    "fontSize": {
      "default": "var(--text-lg)",
      "@media (min-width:40rem)": "var(--text-xl)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-lg--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-xl--line-height))"
    },
    "--tw-font-weight": "var(--font-weight-light)",
    "fontWeight": "var(--font-weight-light)",
    "--tw-tracking": "var(--tracking-wide)",
    "letterSpacing": "var(--tracking-wide)",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appPageStyle6": {
    "width": "100%",
    "maxWidth": "var(--container-xl)"
  },
  "appPageStyle7": {
    "marginTop": "calc(var(--spacing) * 4)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "opacity": ".6",
    "--tw-leading": null
  },
  "appPageStyle8": {
    "borderRadius": ".25rem",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "paddingInline": "var(--spacing)"
  },
  "appPageStyle10": {
    "display": "flex",
    "flexWrap": "wrap",
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 4)"
  },
  "appPageStyle11": {
    "display": "inline-flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--secondary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--secondary) 50%, transparent)"
    },
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": ".3s",
    "--tw-duration": ".3s",
    "--tw-leading": null
  },
  "appPageStyle12": {
    "opacity": ".6",
    "transitionProperty": "opacity",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appPageStyle13": {
    "opacity": "0",
    "transitionProperty": "opacity",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appPageStyle20": {
    "marginTop": "calc(var(--spacing) * 12)"
  },
  "appPageStyle21": {
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "appPageStyle22": {
    "marginInline": "auto",
    "maxWidth": "var(--container-md)",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--secondary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--secondary) 20%, transparent)"
    },
    "padding": "calc(var(--spacing) * 4)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appPageStyle23": {
    "marginBottom": "calc(var(--spacing) * 3)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "opacity": ".8",
    "--tw-leading": null
  },
  "appPageStyle24": {
    "display": "inline-flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": "var(--background)",
    "paddingInline": "calc(var(--spacing) * 3)",
    "paddingBlock": "calc(var(--spacing) * 2)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "appPageStyle25": {
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "opacity": ".6",
    "--tw-leading": null
  },
  "appPageStyle26": {
    "color": "var(--foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "appPageStyle27": {
    "marginInline": "calc(var(--spacing) * 2)",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 50%, transparent)"
    }
  },
  "appProjectWorkPageStyle22": {
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--leading-relaxed)",
    "--tw-leading": "var(--leading-relaxed)",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "color": "var(--muted-foreground)"
  },
  "appProjectWorkPageStyle23": {
    "display": "flex",
    "alignItems": "flex-start",
    "gap": "calc(var(--spacing) * 3)",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--accent)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--accent) 10%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--accent)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--accent) 5%, transparent)"
    },
    "padding": "calc(var(--spacing) * 4)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "fontStyle": "italic",
    "--tw-leading": null,
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "appProjectWorkPageStyle24": {
    "marginTop": "calc(var(--spacing) * .5)",
    "height": "calc(var(--spacing) * 5)",
    "width": "calc(var(--spacing) * 5)",
    "flexShrink": "0",
    "color": "var(--accent-foreground)"
  },
  "componentsApiDocsPageStyle2": {
    "marginInline": "auto",
    "maxWidth": "var(--container-3xl)",
    "paddingInline": {
      "default": "calc(var(--spacing) * 4)",
      "@media (min-width:40rem)": "calc(var(--spacing) * 6)"
    },
    "paddingBlock": "calc(var(--spacing) * 16)"
  },
  "componentsApiDocsPageStyle4": {
    "display": "inline-flex",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle5": {
    "height": "calc(var(--spacing) * 3.5)",
    "width": "calc(var(--spacing) * 3.5)"
  },
  "componentsApiDocsPageStyle7": {
    "display": "inline-flex",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "3.40282e38px",
    "backgroundColor": {
      "default": "var(--primary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--primary) 5%, transparent)"
    },
    "padding": "calc(var(--spacing) * 3)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "componentsApiDocsPageStyle8": {
    "height": "calc(var(--spacing) * 7)",
    "width": "calc(var(--spacing) * 7)",
    "color": "var(--primary)"
  },
  "componentsApiDocsPageStyle9": {
    "fontSize": {
      "default": "var(--text-3xl)",
      "@media (min-width:40rem)": "var(--text-4xl)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-3xl--line-height))",
      "@media (min-width:40rem)": "var(--tw-leading,var(--text-4xl--line-height))"
    },
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-tracking": "var(--tracking-tight)",
    "letterSpacing": "var(--tracking-tight)",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle10": {
    "--tw-leading": "var(--leading-relaxed)",
    "lineHeight": "var(--leading-relaxed)",
    "color": "var(--muted-foreground)"
  },
  "componentsApiDocsPageStyle11": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": "calc(var(--spacing) * 3)"
  },
  "componentsApiDocsPageStyle17": {
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "--tw-tracking": "var(--tracking-wider)",
    "letterSpacing": "var(--tracking-wider)",
    "color": "var(--muted-foreground)",
    "textTransform": "uppercase",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle18": {
    "display": "block",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--secondary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--secondary) 30%, transparent)"
    },
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "wordBreak": "break-all",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle21": {
    "overflowX": "auto",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--secondary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--secondary) 30%, transparent)"
    },
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle24": {
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle25": {
    "display": "flex",
    "gap": "calc(var(--spacing) * 4)",
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2.5)"
  },
  "componentsApiDocsPageStyle26": {
    "flexShrink": "0",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--accent-foreground)",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle27": {
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle31": {
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--card)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--card) 50%, transparent)"
    },
    "padding": "calc(var(--spacing) * 4)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "componentsApiDocsPageStyle32": {
    "display": "flex",
    "flexWrap": "wrap",
    "alignItems": "baseline",
    "gap": "calc(var(--spacing) * 2)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle33": {
    "color": "var(--accent-foreground)"
  },
  "componentsApiDocsPageStyle34": {
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle35": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 70%, transparent)"
    },
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle36": {
    "display": "inline-block",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "wordBreak": "break-all",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "componentsApiDocsPageStyle39": {
    "listStyleType": "disc",
    "paddingLeft": "calc(var(--spacing) * 5)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "componentsCommandMenuStyle1": {
    "display": "flex",
    "alignItems": "center",
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "paddingInline": "calc(var(--spacing) * 3)"
  },
  "componentsCommandMenuStyle2": {
    "marginRight": "calc(var(--spacing) * 2)",
    "height": "calc(var(--spacing) * 4)",
    "width": "calc(var(--spacing) * 4)",
    "flexShrink": "0",
    "opacity": ".5"
  },
  "componentsCommandMenuStyle3": {
    "display": "flex",
    "height": "calc(var(--spacing) * 11)",
    "width": "100%",
    "borderRadius": "calc(var(--radius) - 2px)",
    "backgroundColor": "#0000",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "componentsCommandMenuStyle5": {
    "display": "flex",
    "minWidth": "0",
    "flex": "1",
    "flexDirection": "column"
  },
  "componentsCommandMenuStyle6": {
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "--tw-leading": null
  },
  "componentsCommandMenuStyle7": {
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "fontSize": "10px",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "componentsCommandMenuStyle11": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "color": {
      "default": "var(--foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--foreground) 80%, transparent)"
    },
    "--tw-leading": null
  },
  "componentsCommandMenuStyle13": {
    "marginLeft": "auto",
    "flexShrink": "0",
    "fontSize": "10px",
    "color": {
      "default": "var(--muted-foreground)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--muted-foreground) 60%, transparent)"
    },
    "--tw-leading": null
  },
  "componentsCommandMenuStyle14": {
    "maxWidth": {
      "default": "100%",
      "@media (min-width:40rem)": "var(--container-md)"
    },
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "fontSize": "10px",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "componentsCommandMenuStyle15": {
    "marginInline": "auto",
    "display": "flex",
    "width": "100%",
    "maxWidth": "var(--container-lg)",
    "cursor": "pointer",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": "var(--input)",
    "backgroundColor": {
      "default": "var(--secondary)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--secondary) 50%, transparent)"
    },
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "componentsCommandMenuStyle17": {
    "flex": "1",
    "textAlign": "left"
  },
  "componentsCommandMenuStyle18": {
    "pointerEvents": "none",
    "display": "inline-flex",
    "height": "calc(var(--spacing) * 5)",
    "alignItems": "center",
    "gap": "var(--spacing)",
    "borderRadius": ".25rem",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "backgroundColor": "var(--muted)",
    "paddingInline": "calc(var(--spacing) * 1.5)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "10px",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "color": "var(--muted-foreground)",
    "opacity": "1",
    "WebkitUserSelect": "none",
    "userSelect": "none",
    "--tw-leading": null
  },
  "componentsCoursePageClientStyle5": {
    "display": "flex",
    "minHeight": "100vh",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "var(--background)"
  },
  "componentsCoursePageClientStyle6": {
    "height": "calc(var(--spacing) * 8)",
    "width": "calc(var(--spacing) * 8)",
    "color": "var(--muted-foreground)",
    "animationName": "var(--animate-spin)",
    "animationDuration": "var(--tw-animation-duration,var(--tw-duration,.15s))",
    "animationTimingFunction": "var(--tw-ease,ease)",
    "animationDelay": "var(--tw-animation-delay,0s)",
    "animationIterationCount": "var(--tw-animation-iteration-count,1)",
    "animationDirection": "var(--tw-animation-direction,normal)",
    "animationFillMode": "var(--tw-animation-fill-mode,none)"
  },
  "componentsCoursePageClientStyle12": {
    "marginInline": "auto",
    "maxWidth": "var(--container-4xl)",
    "paddingInline": "calc(var(--spacing) * 6)",
    "paddingTop": "calc(var(--spacing) * 24)",
    "paddingBottom": "calc(var(--spacing) * 12)",
    "textAlign": "center"
  },
  "componentsCoursePageClientStyle16": {
    "marginBottom": "calc(var(--spacing) * 4)",
    "fontSize": "var(--text-2xl)",
    "lineHeight": "var(--tw-leading,var(--text-2xl--line-height))",
    "--tw-font-weight": "var(--font-weight-bold)",
    "fontWeight": "var(--font-weight-bold)",
    "--tw-leading": null
  },
  "componentsCoursePageClientStyle17": {
    "marginBottom": "calc(var(--spacing) * 6)",
    "color": "var(--muted-foreground)"
  },
  "componentsExploreGraphStyle1": {
    "position": "relative",
    "display": "flex",
    "height": "100%",
    "width": "100%",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "componentsExploreGraphStyle2": {
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "componentsGlobalLayoutStyle1": {
    "position": "fixed",
    "top": "calc(var(--spacing) * 4)",
    "right": "calc(var(--spacing) * 4)",
    "zIndex": "100",
    "display": "flex",
    "gap": "calc(var(--spacing) * 3)"
  },
  "componentsNetworkGraphStyle1": {
    "position": "relative",
    "height": "100%",
    "width": "100%"
  },
  "componentsNetworkGraphStyle2": {
    "height": "100%",
    "width": "100%",
    "cursor": "grab"
  },
  "componentsNetworkGraphStyle3": {
    "pointerEvents": "none",
    "position": "absolute",
    "inset": "0",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "opacity": "0",
    "transitionProperty": "opacity",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": ".5s",
    "--tw-duration": ".5s"
  },
  "componentsNetworkGraphStyle5": {
    "position": "absolute",
    "bottom": "calc(var(--spacing) * 4)",
    "left": "calc(var(--spacing) * 4)",
    "maxWidth": "var(--container-xs)",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "backgroundColor": {
      "default": "var(--background)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--background) 80%, transparent)"
    },
    "padding": "calc(var(--spacing) * 3)",
    "fontFamily": "Commit Mono,ui-monospace,monospace",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "color": "var(--muted-foreground)",
    "--tw-backdrop-blur": "blur(var(--blur-sm))",
    "WebkitBackdropFilter": "var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)",
    "backdropFilter": "var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)",
    "--tw-leading": null,
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "componentsNetworkGraphStyle6": {
    "marginBottom": "calc(var(--spacing) * 2)",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "color": "var(--foreground)"
  },
  "componentsNetworkGraphStyle7": {
    "marginTop": "calc(var(--spacing) * 2)",
    "borderTopStyle": "var(--tw-border-style)",
    "borderTopWidth": "1px",
    "borderColor": {
      "default": "var(--border)",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--border) 50%, transparent)"
    },
    "paddingTop": "calc(var(--spacing) * 2)"
  },
  "componentsNetworkGraphStyle8": {
    "marginBottom": "var(--spacing)",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)",
    "color": "var(--foreground)"
  },
  "componentsCourseActionsStyle1": {
    "height": "calc(var(--spacing) * 8)",
    "width": "calc(var(--spacing) * 8)",
    "color": "var(--muted-foreground)"
  },
  "componentsCourseActionsStyle3": {
    "marginLeft": "calc(var(--spacing) * 2)",
    "height": "calc(var(--spacing) * 6)",
    "width": "calc(var(--spacing) * 6)",
    "color": "var(--muted-foreground)"
  },
  "componentsModeToggleStyle1": {
    "height": "1.2rem",
    "width": "1.2rem",
    "--tw-scale-x": "100%",
    "--tw-scale-y": "100%",
    "--tw-scale-z": "100%",
    "scale": "var(--tw-scale-x) var(--tw-scale-y)",
    "rotate": "none",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "componentsModeToggleStyle2": {
    "position": "absolute",
    "height": "1.2rem",
    "width": "1.2rem",
    "--tw-scale-x": "0%",
    "--tw-scale-y": "0%",
    "--tw-scale-z": "0%",
    "scale": "var(--tw-scale-x) var(--tw-scale-y)",
    "rotate": "90deg",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "componentsModeToggleStyle3": {
    "clipPath": "inset(50%)",
    "whiteSpace": "nowrap",
    "borderWidth": "0",
    "width": "1px",
    "height": "1px",
    "margin": "-1px",
    "padding": "0",
    "position": "absolute",
    "overflow": "hidden",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null,
    "marginInline": null,
    "marginBlock": null,
    "marginTop": null,
    "marginRight": null,
    "marginBottom": null,
    "marginLeft": null,
    "marginInlineStart": null,
    "marginInlineEnd": null,
    "marginBlockStart": null,
    "marginBlockEnd": null
  },
  "badgevariantdefault": {
    "display": "inline-flex",
    "width": "fit-content",
    "maxWidth": "100%",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "var(--spacing)",
    "overflow": "hidden",
    "borderRadius": "3.40282e38px",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": "#0000",
    "backgroundColor": "var(--primary)",
    "paddingInline": "calc(var(--spacing) * 2)",
    "paddingBlock": "calc(var(--spacing) * .5)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "color": "var(--primary-foreground)",
    "transitionProperty": "color,box-shadow",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "badgevariantsecondary": {
    "display": "inline-flex",
    "width": "fit-content",
    "maxWidth": "100%",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "var(--spacing)",
    "overflow": "hidden",
    "borderRadius": "3.40282e38px",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": "#0000",
    "backgroundColor": "var(--secondary)",
    "paddingInline": "calc(var(--spacing) * 2)",
    "paddingBlock": "calc(var(--spacing) * .5)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "color": "var(--secondary-foreground)",
    "transitionProperty": "color,box-shadow",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "badgevariantdestructive": {
    "display": "inline-flex",
    "width": "fit-content",
    "maxWidth": "100%",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "var(--spacing)",
    "overflow": "hidden",
    "borderRadius": "3.40282e38px",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": "#0000",
    "backgroundColor": "var(--destructive)",
    "paddingInline": "calc(var(--spacing) * 2)",
    "paddingBlock": "calc(var(--spacing) * .5)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "color": "var(--color-white)",
    "transitionProperty": "color,box-shadow",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "badgevariantoutline": {
    "display": "inline-flex",
    "width": "fit-content",
    "maxWidth": "100%",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "var(--spacing)",
    "overflow": "hidden",
    "borderRadius": "3.40282e38px",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "paddingInline": "calc(var(--spacing) * 2)",
    "paddingBlock": "calc(var(--spacing) * .5)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "color": "var(--foreground)",
    "transitionProperty": "color,box-shadow",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "badgeBase": {
    "display": "inline-flex",
    "width": "fit-content",
    "maxWidth": "100%",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "var(--spacing)",
    "overflow": "hidden",
    "borderRadius": "3.40282e38px",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "paddingInline": "calc(var(--spacing) * 2)",
    "paddingBlock": "calc(var(--spacing) * .5)",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
    "transitionProperty": "color,box-shadow",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-leading": null
  },
  "buttonvariantdefault": {
    "display": "inline-flex",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "backgroundColor": "var(--primary)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "whiteSpace": "nowrap",
    "color": "var(--primary-foreground)",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "buttonvariantdestructive": {
    "display": "inline-flex",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "backgroundColor": "var(--destructive)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "whiteSpace": "nowrap",
    "color": "var(--color-white)",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "buttonvariantoutline": {
    "display": "inline-flex",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "backgroundColor": "var(--background)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "whiteSpace": "nowrap",
    "--tw-shadow": "0 1px 2px 0 var(--tw-shadow-color,#0000000d)",
    "boxShadow": "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "buttonvariantsecondary": {
    "display": "inline-flex",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "backgroundColor": "var(--secondary)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "whiteSpace": "nowrap",
    "color": "var(--secondary-foreground)",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "buttonvariantghost": {
    "display": "inline-flex",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "whiteSpace": "nowrap",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "buttonvariantlink": {
    "display": "inline-flex",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "whiteSpace": "nowrap",
    "color": "var(--primary)",
    "textUnderlineOffset": "4px",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "buttonsizedefault": {
    "height": "calc(var(--spacing) * 9)",
    "paddingInline": "calc(var(--spacing) * 4)",
    "paddingBlock": "calc(var(--spacing) * 2)"
  },
  "buttonsizesm": {
    "height": "calc(var(--spacing) * 8)",
    "gap": "calc(var(--spacing) * 1.5)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "paddingInline": "calc(var(--spacing) * 3)"
  },
  "buttonsizelg": {
    "height": "calc(var(--spacing) * 10)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "paddingInline": "calc(var(--spacing) * 6)"
  },
  "buttonsizeicon": {
    "width": "calc(var(--spacing) * 9)",
    "height": "calc(var(--spacing) * 9)"
  },
  "buttonsizeicon_sm": {
    "width": "calc(var(--spacing) * 8)",
    "height": "calc(var(--spacing) * 8)"
  },
  "buttonsizeicon_lg": {
    "width": "calc(var(--spacing) * 10)",
    "height": "calc(var(--spacing) * 10)"
  },
  "buttonBase": {
    "display": "inline-flex",
    "flexShrink": "0",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 2px)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    "fontWeight": "var(--font-weight-medium)",
    "whiteSpace": "nowrap",
    "transitionProperty": "all",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "componentsUiCardStyle1": {
    "display": "flex",
    "flexDirection": "column",
    "gap": "calc(var(--spacing) * 6)",
    "borderRadius": "calc(var(--radius) + 4px)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "backgroundColor": "var(--card)",
    "paddingBlock": "calc(var(--spacing) * 6)",
    "color": "var(--card-foreground)",
    "--tw-shadow": "0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a)",
    "boxShadow": "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)"
  },
  "componentsUiCardStyle2": {
    "container": "card-header/inline-size",
    "display": "grid",
    "gridAutoRows": "min-content",
    "gridTemplateRows": "auto auto",
    "alignItems": "flex-start",
    "gap": "calc(var(--spacing) * 2)",
    "paddingInline": "calc(var(--spacing) * 6)"
  },
  "componentsUiCardStyle3": {
    "--tw-leading": "1",
    "lineHeight": "1",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)"
  },
  "componentsUiCardStyle5": {
    "gridColumnStart": "2",
    "gridRow": "span 2/span 2",
    "gridRowStart": "1",
    "alignSelf": "flex-start",
    "justifySelf": "flex-end"
  },
  "componentsUiCardStyle6": {
    "paddingInline": "calc(var(--spacing) * 6)"
  },
  "componentsUiCardStyle7": {
    "display": "flex",
    "alignItems": "center",
    "paddingInline": "calc(var(--spacing) * 6)"
  },
  "componentsUiCommandStyle1": {
    "display": "flex",
    "height": "100%",
    "width": "100%",
    "flexDirection": "column",
    "overflow": "hidden",
    "borderRadius": "calc(var(--radius) - 2px)",
    "backgroundColor": "var(--popover)",
    "color": "var(--popover-foreground)"
  },
  "componentsUiCommandStyle3": {
    "overflow": "hidden",
    "padding": "0",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "componentsUiCommandStyle4": {},
  "componentsUiCommandStyle5": {
    "display": "flex",
    "height": "calc(var(--spacing) * 9)",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderBottomStyle": "var(--tw-border-style)",
    "borderBottomWidth": "1px",
    "paddingInline": "calc(var(--spacing) * 3)"
  },
  "componentsUiCommandStyle6": {
    "width": "calc(var(--spacing) * 4)",
    "height": "calc(var(--spacing) * 4)",
    "flexShrink": "0",
    "opacity": ".5"
  },
  "componentsUiCommandStyle7": {
    "display": "flex",
    "height": "calc(var(--spacing) * 10)",
    "width": "100%",
    "borderRadius": "calc(var(--radius) - 2px)",
    "backgroundColor": "#0000",
    "paddingBlock": "calc(var(--spacing) * 3)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "outlineOffset": {
      "default": null,
      "@media (forced-colors:active)": "2px"
    },
    "outline": {
      "default": null,
      "@media (forced-colors:active)": "2px solid #0000"
    },
    "--tw-leading": null
  },
  "componentsUiCommandStyle8": {
    "maxHeight": "300px",
    "scrollPaddingBlock": "var(--spacing)",
    "overflowX": "hidden",
    "overflowY": "auto"
  },
  "componentsUiCommandStyle9": {
    "paddingBlock": "calc(var(--spacing) * 6)",
    "textAlign": "center",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-leading": null
  },
  "componentsUiCommandStyle10": {
    "overflow": "hidden",
    "padding": "var(--spacing)",
    "color": "var(--foreground)",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "componentsUiCommandStyle11": {
    "marginInline": "calc(var(--spacing) * -1)",
    "height": "1px",
    "backgroundColor": "var(--border)"
  },
  "componentsUiCommandStyle12": {
    "position": "relative",
    "display": "flex",
    "cursor": "default",
    "alignItems": "center",
    "gap": "calc(var(--spacing) * 2)",
    "borderRadius": "calc(var(--radius) - 4px)",
    "paddingInline": "calc(var(--spacing) * 2)",
    "paddingBlock": "calc(var(--spacing) * 1.5)",
    "fontSize": "var(--text-sm)",
    "lineHeight": "var(--tw-leading,var(--text-sm--line-height))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "outlineOffset": {
      "default": null,
      "@media (forced-colors:active)": "2px"
    },
    "outline": {
      "default": null,
      "@media (forced-colors:active)": "2px solid #0000"
    },
    "WebkitUserSelect": "none",
    "userSelect": "none",
    "--tw-leading": null
  },
  "componentsUiCommandStyle13": {
    "marginLeft": "auto",
    "fontSize": "var(--text-xs)",
    "lineHeight": "var(--tw-leading,var(--text-xs--line-height))",
    "--tw-tracking": "var(--tracking-widest)",
    "letterSpacing": "var(--tracking-widest)",
    "color": "var(--muted-foreground)",
    "--tw-leading": null
  },
  "componentsUiDialogStyle1": {
    "position": "fixed",
    "inset": "0",
    "zIndex": "50",
    "backgroundColor": {
      "default": "#00000080",
      "@supports (color:color-mix(in lab, red, red))": "color-mix(in oklab, var(--color-black) 50%, transparent)"
    }
  },
  "componentsUiDialogStyle2": {
    "position": "fixed",
    "top": "50%",
    "left": "50%",
    "zIndex": "50",
    "display": "grid",
    "width": "100%",
    "maxWidth": {
      "default": "calc(100% - 2rem)",
      "@media (min-width:40rem)": "var(--container-lg)"
    },
    "--tw-translate-x": "-50%",
    "translate": "var(--tw-translate-x) var(--tw-translate-y)",
    "--tw-translate-y": "-50%",
    "gap": "calc(var(--spacing) * 4)",
    "borderRadius": "var(--radius)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "backgroundColor": "var(--background)",
    "padding": "calc(var(--spacing) * 6)",
    "--tw-shadow": "0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a)",
    "boxShadow": "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    "--tw-duration": ".2s",
    "transitionDuration": ".2s",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "componentsUiDialogStyle3": {
    "position": "absolute",
    "top": "calc(var(--spacing) * 4)",
    "right": "calc(var(--spacing) * 4)",
    "borderRadius": "var(--radius-xs)",
    "opacity": ".7",
    "--tw-ring-offset-color": "var(--background)",
    "transitionProperty": "opacity",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))"
  },
  "componentsUiDialogStyle5": {
    "display": "flex",
    "flexDirection": "column",
    "gap": "calc(var(--spacing) * 2)",
    "textAlign": {
      "default": "center",
      "@media (min-width:40rem)": "left"
    }
  },
  "componentsUiDialogStyle6": {
    "display": "flex",
    "flexDirection": {
      "default": "column-reverse",
      "@media (min-width:40rem)": "row"
    },
    "gap": "calc(var(--spacing) * 2)",
    "justifyContent": {
      "default": null,
      "@media (min-width:40rem)": "flex-end"
    }
  },
  "componentsUiDialogStyle7": {
    "fontSize": "var(--text-lg)",
    "lineHeight": "1",
    "--tw-leading": "1",
    "--tw-font-weight": "var(--font-weight-semibold)",
    "fontWeight": "var(--font-weight-semibold)"
  },
  "componentsUiInputStyle1": {
    "height": "calc(var(--spacing) * 9)",
    "width": "100%",
    "minWidth": "0",
    "borderRadius": "calc(var(--radius) - 2px)",
    "borderStyle": "var(--tw-border-style)",
    "borderWidth": "1px",
    "borderColor": "var(--input)",
    "backgroundColor": "#0000",
    "paddingInline": "calc(var(--spacing) * 3)",
    "paddingBlock": "var(--spacing)",
    "fontSize": {
      "default": "var(--text-base)",
      "@media (min-width:48rem)": "var(--text-sm)"
    },
    "lineHeight": {
      "default": "var(--tw-leading,var(--text-base--line-height))",
      "@media (min-width:48rem)": "var(--tw-leading,var(--text-sm--line-height))"
    },
    "--tw-shadow": "0 1px 2px 0 var(--tw-shadow-color,#0000000d)",
    "boxShadow": "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    "transitionProperty": "color,box-shadow",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none",
    "--tw-leading": null
  },
  "scrollVertical": {
    "display": "flex",
    "height": "100%",
    "width": "calc(var(--spacing) * 2.5)",
    "touchAction": "none",
    "borderLeftStyle": "var(--tw-border-style)",
    "borderLeftWidth": "1px",
    "borderLeftColor": "#0000",
    "padding": "1px",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "WebkitUserSelect": "none",
    "userSelect": "none",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "scrollHorizontal": {
    "display": "flex",
    "height": "calc(var(--spacing) * 2.5)",
    "touchAction": "none",
    "flexDirection": "column",
    "borderTopStyle": "var(--tw-border-style)",
    "borderTopWidth": "1px",
    "borderTopColor": "#0000",
    "padding": "1px",
    "transitionProperty": "color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "WebkitUserSelect": "none",
    "userSelect": "none",
    "paddingInline": null,
    "paddingBlock": null,
    "paddingTop": null,
    "paddingRight": null,
    "paddingBottom": null,
    "paddingLeft": null,
    "paddingInlineStart": null,
    "paddingInlineEnd": null,
    "paddingBlockStart": null,
    "paddingBlockEnd": null
  },
  "componentsUiScrollAreaStyle1": {
    "position": "relative"
  },
  "componentsUiScrollAreaStyle2": {
    "width": "100%",
    "height": "100%",
    "borderRadius": "inherit",
    "transitionProperty": "color,box-shadow",
    "transitionTimingFunction": "var(--tw-ease,var(--default-transition-timing-function))",
    "transitionDuration": "var(--tw-duration,var(--default-transition-duration))",
    "--tw-outline-style": "none",
    "outlineStyle": "none"
  },
  "componentsUiScrollAreaStyle3": {
    "position": "relative",
    "flex": "1",
    "borderRadius": "3.40282e38px",
    "backgroundColor": "var(--border)"
  },
  "componentsUiSeparatorStyle1": {
    "flexShrink": "0",
    "backgroundColor": "var(--border)"
  }
});
