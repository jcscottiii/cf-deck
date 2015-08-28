

export function wrapOrgs(orgs) {
  var n = 0;
  return orgs.map((org) => {
    return {
      metadata: { guid: n },
      entity: org
    };
    n++;
  });
};

export function unwrapOrgs(orgs) {
  return orgs.map((org) => {
    return Object.assign(org.entity, org.metadata);
  });
}
