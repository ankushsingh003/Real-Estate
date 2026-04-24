import React from 'react';

const Input = ({ label, icon: Icon, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-semibold text-foreground/80 ml-1">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
            <Icon size={20} />
          </div>
        )}
        <input
          {...props}
          className={`w-full bg-muted/50 border border-border rounded-2xl py-3.5 ${Icon ? 'pl-12' : 'px-5'} pr-5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/60`}
        />
      </div>
    </div>
  );
};

export default Input;
