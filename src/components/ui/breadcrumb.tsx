import { Breadcrumb, type SystemStyleObject } from "@chakra-ui/react";
import { Children, Fragment, forwardRef, isValidElement } from "react";

export interface BreadcrumbRootProps extends Breadcrumb.RootProps {
  separator?: React.ReactNode;
  separatorGap?: SystemStyleObject["gap"];
}

export const BreadcrumbRoot = forwardRef<HTMLDivElement, BreadcrumbRootProps>(
  function BreadcrumbRoot(props, ref) {
    const { separator, separatorGap, children, ...rest } = props;
    const validChildren = Children.toArray(children).filter(isValidElement);
    return (
      <Breadcrumb.Root ref={ref} {...rest}>
        <Breadcrumb.List gap={separatorGap}>
          {validChildren.map((child, index) => {
            const last = index === validChildren.length - 1;
            return (
              <Fragment key={index}>
                {/* todo: customise it better
                   - don't break light/dark mode
                   - use a better hover feedback than underline
                   - review size (too small?)
                   */}
                <Breadcrumb.Item className="text-slate-400 hover:text-slate-100">
                  {child}
                </Breadcrumb.Item>
                {!last && (
                  <Breadcrumb.Separator className="text-slate-400">
                    {separator}
                  </Breadcrumb.Separator>
                )}
              </Fragment>
            );
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    );
  },
);

export const BreadcrumbLink = Breadcrumb.Link;
export const BreadcrumbCurrentLink = Breadcrumb.CurrentLink;
export const BreadcrumbEllipsis = Breadcrumb.Ellipsis;
